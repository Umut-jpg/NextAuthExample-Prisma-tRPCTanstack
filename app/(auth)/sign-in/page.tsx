import SignInForm from "@/components/custom-ui/auth/signIn.component";

const page = () => {
  return (
    <div className=" bg-zinc-600 justify-center items-center flex flex-col p-10 rounded-md">
      <SignInForm />
    </div>
  );
};

export default page;
