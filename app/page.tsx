import { LoginButton } from "@/components/auth/login_button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔏 Auth
          </h1>
          <p className="text-white text-lg ">A simple authentication service</p>
          <div>
            <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
            </LoginButton>
          </div>
        </div>
    </main>
  );
}
