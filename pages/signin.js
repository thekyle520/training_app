import SignInForm from "../components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col py-12 sm:px-6 lg:px-8">
        <div className= "container bg-slate-100 rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-12 text-center text-3xl font-extrabold text-gray-900">
                Sign In
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">Welcome back!</p>
            </div>
            <div className="mt-8 mb-12 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <SignInForm />
                </div>
            </div>
        </div>
    </div>
      
  );
}