"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { on } from "events";

type Inputs = {
  email: string;
  senha: string;
};

export default function Login() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = () => {
    push("/");
  };

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>{" "}
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="senha"
                  {...register("senha", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                    minLength: {
                      value: 6,
                      message: "A senha deve ter no mínimo 6 caracteres",
                    },
                  })}
                />
                {errors.senha && <span>{errors.senha.message}</span>}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="btn btn-link">
                  não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
