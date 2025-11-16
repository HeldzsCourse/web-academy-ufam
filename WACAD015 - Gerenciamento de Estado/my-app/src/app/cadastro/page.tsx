"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
  nome: string;
  email: string;
  confirmarEmail: string;
  senha: string;
};

export default function Cadastro() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const email = watch("email");

  const onSubmit: SubmitHandler<Inputs> = () => {
    push("/login");
  };

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nome"
                  aria-describedby="nome"
                  {...register("nome", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                />
                {errors.nome && <span>{errors.nome.message}</span>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
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
                <label htmlFor="confirmarEmail" className="form-label">
                  Confirmar email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="confirmarEmail"
                  aria-describedby="confirmarEmail"
                  {...register("confirmarEmail", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                    validate: (value) =>
                      value === email || "Os emails não são iguais",
                  })}
                />
                {errors.confirmarEmail && (
                  <span>{errors.confirmarEmail.message}</span>
                )}
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
                  Confirmar cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
