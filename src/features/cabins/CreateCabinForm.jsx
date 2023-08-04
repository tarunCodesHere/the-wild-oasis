import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// initial cabinToEdit to empty object for some unforseen situation
function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;

  // isEditSession to check if we're creating it for the first time or not
  // false== first time ,,,, true== creating it to edit
  const isEditSession = Boolean(editId);

  // getValues is a function which returns all the values as an object &
  //using formState we can show an error message on the side of the box
  // reset== to reset the form to initial state
  // register== to get data from that from inputs
  // handleSubmit= what will happen when we'll click the submit button
  // getValues()== to get all the form data at one go
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    // defaultValues to auto fill form while we're editing it
    defaultValues: isEditSession ? editValues : {},
  });
  // console.log(getValues());
  const { errors } = formState;

  // for creating a new cabin we'll use this custom hook
  const { createCabin, isCreating } = useCreateCabin();

  // this hook will be used while editing an existing cabin
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmittingTheForm(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // mutate(data);
    if (isEditSession)
      editCabin(
        { newCabinObject: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
  }

  function onError(err) {
    // console.log(err);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmittingTheForm, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "The capacity should be atleast 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",

            // value is the input value which we type in the box.
            //  validate accepts a callback function whose argument is that 'value'
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "discount must be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow lable="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isEditSession ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
