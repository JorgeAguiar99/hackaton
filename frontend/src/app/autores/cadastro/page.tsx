"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  InputLogin,
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

export default function Cadastro() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objSalvar = {
        nome: e.target.nome.value,
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
      };
      axios
        .post("http://127.0.0.1:8000/autores", objSalvar)
        .then((resposta) => {
          // redirecionar para a pagina de listagem com prop de sucesso na url
          router.push("/autores/listagem?status=1&mensagem=" + resposta.data.mensagem);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setToastMessage(err.response.data.mensagem);
          setToast(true);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      <LayoutDashboard active="autores">
        <Loading loading={loading} />
        <ToastComponent
          show={toast}
          message={toastMessage}
          colors="danger"
          onClose={() => {
            setToast(false);
          }}
        />

        <CardForm
          className="row g-1 needs-validation"
          noValidate
          ref={refForm}
          onSubmit={submitForm}
        >
          <div className="input-group has-validadion">
            <div className="col-md-12">
              <InputLogin type="number" id="id" name="id" hidden />
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite o nome do autor"
                id="nome"
                name="nome"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o nome do autor.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite o endereço do autor"
                id="endereco"
                name="endereco"
              />

              <div className="invalid-feedback">
                Por favor digite o endereço do autor.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite a cidade do autor"
                id="cidade"
                name="cidade"
              />

              <div className="invalid-feedback">
                Por favor digite a cidade do autor.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite a UF do autor"
                id="uf"
                name="uf"
              />

              <div className="invalid-feedback">
                Por favor digite a UF do autor.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="number"
                className="form-control"
                placeholder="Digite o telefone do autor"
                id="telefone"
                name="telefone"
              />

              <div className="invalid-feedback">
                Por favor digite o telefone do autor.
              </div>
            </div>
          </div>
          <CardButton className="col-md-12">
            <ButtonConfig className="btn btn-primary" type="submit" id="botao">
              Salvar
            </ButtonConfig>
          </CardButton>
        </CardForm>
      </LayoutDashboard>
    </>
  );
}
