import { AuthCard } from "../../components/auth/AuthCard";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useRegisterController } from "./useRegisterController";

export function Register() {
  const { register, errors, handleSubmit } = useRegisterController();

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Já possui uma conta?"
      linkText="Fazer Login"
      linkTo="/login"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Nome"
          error={errors.name?.message}
          {...register("name")}
        />
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

        <Button type="submit">Criar conta</Button>
      </form>
    </AuthCard>
  );
}
