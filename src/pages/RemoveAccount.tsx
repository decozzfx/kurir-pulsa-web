import { useForm } from "react-hook-form";
import InputField from "../components/input/InputField";
import { Button } from "@mui/material";
import supabase from "../api/supabaseClient";
import toast from "react-hot-toast";

interface IForm {
  name: string;
  email: string;
  reason: string;
}

const RemoveAccount = () => {
  const { control, handleSubmit, reset } = useForm<IForm>();

  async function onSubmit(formValues: IForm) {
    const { data, error } = await supabase.functions.invoke("remove-account", {
      body: formValues,
    });
    console.log("🚀 ~ onSubmit ~ data:", data);
    console.log("🚀 ~ onSubmit ~ error:", error);
    reset();
    toast.success("Permintaan terkirim");
  }
  return (
    <div className=" p-0 m-0 scroll-smooth ">
      <h1 className="text-3xl text-center font-semibold">
        Permintaan untuk menghapus akun
      </h1>
      <div className="my-24" />
      <form
        className="flex flex-col w-1/2 mx-auto gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          control={control}
          inputName="name"
          label="Nama"
          placeholder="Nama"
        />
        <InputField
          control={control}
          inputName="email"
          label="Email"
          placeholder="Email"
        />
        <InputField
          inputType="textarea"
          control={control}
          inputName="reason"
          label="Alasan"
          placeholder="Alasan
        "
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RemoveAccount;
