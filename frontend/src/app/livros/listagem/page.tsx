"use client";

import { LayoutDashboard } from "@/components/LayoutDashboard";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ButtonCad,
  ButtonDel,
  ButtonEdit,
  ButtonWrapper,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableWrapper,
} from "./style";
import axios from "axios";
import { Loading } from "@/components/Loading";
import { Trash3, Pencil } from "react-bootstrap-icons";
import Modal from "react-bootstrap/Modal";
import {
  ButtonConfig,
  CardButton,
  CardForm,
  InputLogin,
  InputSelect,
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

interface livrosProps {
  id: number;
  titulo: string;
  subTitulo: string;
  isbn: string;
  autores_id: number;
  autor: string;
  editoras_id: number;
  editora: string;
  local: string;
  ano: number;
  created_at: string;
  updated_at: string;
}

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

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [livros, setLivros] = useState<Array<livrosProps>>();
  const [autores, setAutores] = useState<Array<autoresProps>>();
  const [editoras, setEditoras] = useState<Array<editorasProps>>();
  const [showModal, setShowModal] = useState(false);
  const [selectedLivro, setSelectedLivro] = useState<livrosProps>();
  const [toastColor, setToastColor] = useState("danger");

  // verifica se o parametro status existe na url
  const urlParams = new URLSearchParams(window.location.search);
  const urlStatus = urlParams.get("status");
  const urlMensagem = urlParams.get("mensagem");


  useEffect(() => {
    setLoading(true);
    loadLivros();
    loadAutores();
    loadEditoras();

    if (urlStatus) {
      setToastMessage('' + urlMensagem);
      setToastColor("success");
      setToast(true);

      // remove o parametro status da url
      window.history.replaceState({}, "", "/livros/listagem");
    }
  }, [urlStatus]);


  const openModal = (livro: livrosProps) => {
    setSelectedLivro(livro);
    setShowModal(true);
  };

  const loadLivros = function () {
    axios.get("http://127.0.0.1:8000/livros").then((resposta) => {
      setLivros(resposta.data.livro);
      setLoading(false);
    });
  };

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

  const excluirLivros = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://127.0.0.1:8000/livros/" + id)
      .then((resposta) => {
        setLoading(false);
        // verifica se a resposta foi sucesso ou se contem o texto Integrity constraint violation (erro de integridade de dados)
        if (resposta.data.status === "sucesso") {
          setToastMessage(resposta.data.mensagem);
          setToastColor("success");
          setToast(true);
        } else if (resposta.data.mensagem.includes("Integrity constraint violation")) {
          setToastMessage("Não é possivel excluir o livro! Existem Reservas vinculadas a ele.");
          setToastColor("danger");
          setToast(true);
        }

        loadLivros();
      })
      .catch((err) => {
        setToastMessage(err.message);
        setToastColor("danger");
        setToast(true);
        setLoading(false);
      });
  }, []);

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objAtualizar = {
        id: e.target.id.value,
        titulo: e.target.titulo.value,
        subTitulo: e.target.subtitulo.value,
        isbn: e.target.isbn.value,
        autores_id: e.target.autores_id.value,
        editoras_id: e.target.editoras_id.value,
        local: e.target.local.value,
        ano: e.target.ano.value,
      };
      axios
        .put("http://127.0.0.1:8000/livros/" + objAtualizar.id, objAtualizar)
        .then((resposta) => {
          loadLivros();
          setToastMessage(resposta.data.mensagem);
          setToastColor("success");
          setToast(true);
          setLoading(false);
          setShowModal(false);
        })
        .catch((err) => {
          setLoading(false);
          setToastMessage(err.response.data.mensagem);
          setToastColor("danger");
          setToast(true);
          setShowModal(false);
        });
    } else {
      refForm.current.classList.add("was-validated");
    }
  }, []);

  return (
    <>
      {" "}
      <ToastComponent
        show={toast}
        message={toastMessage}
        colors={toastColor}
        onClose={() => {
          setToast(false);
        }}
      />
      <Loading loading={loading} />
      <LayoutDashboard active="livros">
        <ButtonWrapper>
          <ButtonCad href={"/livros/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Título</TableHeader>
                <TableHeader>Sub-Título</TableHeader>
                <TableHeader>ISBN</TableHeader>
                <TableHeader>Autor</TableHeader>
                <TableHeader>Editora</TableHeader>
                <TableHeader>Local</TableHeader>
                <TableHeader>Ano</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {livros?.map((rec, index) => {
                return (
                  <>
                    <TableRow key={index}>
                      <TableCell>{rec.id}</TableCell>
                      <TableCell>{rec.titulo}</TableCell>
                      <TableCell>{rec.subTitulo}</TableCell>
                      <TableCell>{rec.isbn}</TableCell>
                      <TableCell>{rec.autor}</TableCell>
                      <TableCell>{rec.editora}</TableCell>
                      <TableCell>{rec.local}</TableCell>
                      <TableCell>{rec.ano}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirLivros(rec.id);
                          }}
                        >
                          <Trash3></Trash3>
                        </ButtonDel>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      </LayoutDashboard>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedLivro && <p>Editando : {selectedLivro.titulo}</p>}
          <CardForm
            className="row g-1 needs-validation"
            noValidate
            ref={refForm}
            onSubmit={submitForm}
          >
            <div className="input-group has-validadion">
              <div className="col-md-12">
                <InputLogin
                  type="number"
                  id="id"
                  name="id"
                  defaultValue={selectedLivro?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o titulo do livro"
                  id="titulo"
                  name="titulo"
                  defaultValue={selectedLivro?.titulo}
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
                  name="subtitulo"
                  defaultValue={selectedLivro?.subTitulo}
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
                  defaultValue={selectedLivro?.isbn}
                  required
                />
                <div className="invalid-feedback">
                  Por favor digite o ISBN do livro.
                </div>
              </div>
              <div className="col-md-12">
                <InputSelect
                  name="autores_id"
                  id="autores_id"
                  required
                  defaultValue={selectedLivro?.autores_id}
                >
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
                <InputSelect
                  name="editoras_id"
                  id="editora_id"
                  required
                  defaultValue={selectedLivro?.editoras_id}
                >
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
                  defaultValue={selectedLivro?.local}
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
                  defaultValue={selectedLivro?.ano}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o ano do livro.
                </div>
              </div>
            </div>
            <CardButton className="col-md-12">
              <ButtonConfig
                className="btn btn-primary"
                type="submit"
                id="botao"
              >
                Salvar
              </ButtonConfig>
            </CardButton>
          </CardForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
