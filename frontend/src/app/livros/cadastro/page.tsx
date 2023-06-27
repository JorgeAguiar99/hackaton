"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loading } from "@/components/Loading";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  CardSenhaEmail,
  InputLogin,
  InputSelect,
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

interface autoresProps {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  created_at: string;
  updated_at: string;
}

interface editorasProps {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  uf: string;
  telefone: string;
  created_at: string;
  updated_at: string;
}

export default function Cadastro() {
  const router = useRouter();
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [autores, setAutores] = useState<Array<autoresProps>>();
  const [editoras, setEditoras] = useState<Array<editorasProps>>();

  useEffect(() => {
    loadAutores();
    loadEditoras();
  }, []);

  const loadAutores = function () {
    axios.get("http://127.0.0.1:8000/autores").then((resposta) => {
      setAutores(resposta.data.autor);
      setLoading(false);
    });
  };

  const loadEditoras = function () {
    axios.get("http://127.0.0.1:8000/editoras").then((resposta) => {
      setEditoras(resposta.data.editora);
      setLoading(false);
    });
  };


  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objSalvar = {
        titulo: e.target.titulo.value,
        subTitulo: e.target.subtitulo.value,
        isbn: e.target.isbn.value,
        autores_id: e.target.autor_id.value,
        editoras_id: e.target.editora_id.value,
        local: e.target.local.value,
        ano: e.target.ano.value,
      };
      axios
        .post("http://127.0.0.1:8000/livros", objSalvar)
        .then((resposta) => {
          // redirecionar para a pagina de listagem com prop de sucesso na url
          router.push("/livros/listagem?status=1&mensagem=" + resposta.data.mensagem);
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
      <LayoutDashboard active="livros">
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
                placeholder="Digite o titulo do livro"
                id="titulo"
                name="titulo"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o titulo do livro.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite o sub-título do livro"
                id="subtitulo"
                name="subTitulo"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o sub-título do livro.
              </div>
            </div>

            <div className="col-md-12">
              <InputLogin
                type="text"
                className="form-control"
                placeholder="Digite o ISBN do livro"
                id="isbn"
                name="isbn"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o ISBN do livro.
              </div>
            </div>
            <div className="col-md-12">
              <InputSelect name="autor_id" id="autor_id" required>
                {autores?.map((autor, index) => {
                  return (
                    <>
                      <option value={autor.id}>{autor?.nome}</option>
                    </>
                  );
                })}
              </InputSelect>

              <div className="invalid-feedback">
                Por favor selecione o autor do livro.
              </div>
            </div>
            <div className="col-md-12">
              <InputSelect name="editora_id" id="editora_id" required>
                {editoras?.map((editora, index) => {
                  return (
                    <>
                      <option value={editora.id}>{editora?.nome}</option>
                    </>
                  );
                })}
              </InputSelect>

              <div className="invalid-feedback">
                Por favor selecione a editora do livro.
              </div>
            </div>
            <div className="col-md-12">
              <InputLogin
                type="string"
                className="form-control"
                placeholder="Digite o local do livro"
                id="local"
                name="local"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o local do livro.
              </div>
            </div>
            <div className="col-md-12">
              <InputLogin
                type="number"
                className="form-control"
                placeholder="Digite o ano do livro"
                id="ano"
                name="ano"
                required
              />

              <div className="invalid-feedback">
                Por favor digite o ano do livro.
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
