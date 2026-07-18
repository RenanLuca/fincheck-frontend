import { AuthCard } from "../../components/auth/AuthCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useLoginController } from "./useLoginController";

export function Login() {
  const { register, errors, handleSubmit, isLoading } = useLoginController();

  return (
    <AuthCard
      title="Entre em sua conta"
      subtitle="Novo por aqui?"
      linkText="Crie uma conta"
      linkTo="/register"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="E-mail"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="Senha"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" isLoading={isLoading}>
          Entrar
        </Button>
      </form>
    </AuthCard>
  );
}
