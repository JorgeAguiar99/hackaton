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
} from "@/app/login/styles";
import { ToastComponent } from "@/components/Toast";

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
  const [editoras, setEditoras] = useState<Array<editorasProps>>();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedEditora, setSelectedEditora] = useState<editorasProps>();
  const [toastColor, setToastColor] = useState("danger");

  // verifica se o parametro status existe na url
  const urlParams = new URLSearchParams(window.location.search);
  const urlStatus = urlParams.get("status");
  const urlMensagem = urlParams.get("mensagem");

  useEffect(() => {
    setLoading(true);
    loadEditoras();

    if (urlStatus) {
      setToastMessage('' + urlMensagem);
      setToastColor("success");
      setToast(true);

      // remove o parametro status da url
      window.history.replaceState({}, "", "/autores/listagem");
    }
  }, [urlStatus]);

  const openModal = (editora: editorasProps) => {
    setSelectedEditora(editora);
    setShowModal(true);
  };

  const loadEditoras = function () {
    axios.get("http://127.0.0.1:8000/editoras").then((resposta) => {
      setEditoras(resposta.data.editora);
      setLoading(false);
    });
  };

  const excluirEditoras = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://127.0.0.1:8000/editoras/" + id)
      .then((resposta) => {
        setLoading(false);
        // verifica se a resposta foi sucesso ou se contem o texto Integrity constraint violation (erro de integridade de dados)
        if (resposta.data.status === "sucesso") {
          setToastMessage(resposta.data.mensagem);
          setToastColor("success");
          setToast(true);
        } else if (resposta.data.mensagem.includes("Integrity constraint violation")) {
          setToastMessage("Não é possivel excluir a editora! Existem livros vinculados a ela.");
          setToastColor("danger");
          setToast(true);
        }

        loadEditoras();
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
        nome: e.target.nome.value,
        endereco: e.target.endereco.value,
        cidade: e.target.cidade.value,
        uf: e.target.uf.value,
        telefone: e.target.telefone.value,
      };
      axios
        .put("http://127.0.0.1:8000/editoras/" + objAtualizar.id, objAtualizar)
        .then((resposta) => {
          loadEditoras();
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
      <Loading loading={loading} />
      <ToastComponent
        show={toast}
        message={toastMessage}
        colors={toastColor}
        onClose={() => {
          setToast(false);
        }}
      />
      <LayoutDashboard active="editoras">
        <ButtonWrapper>
          <ButtonCad href={"/editoras/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Endereço</TableHeader>
                <TableHeader>Cidade</TableHeader>
                <TableHeader>UF</TableHeader>
                <TableHeader>Telefone</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {editoras?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.nome}</TableCell>
                      <TableCell>{rec.endereco}</TableCell>
                      <TableCell>{rec.cidade}</TableCell>
                      <TableCell>{rec.uf}</TableCell>
                      <TableCell>{rec.telefone}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirEditoras(rec.id);
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
          <Modal.Title>Editar Editora</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedEditora && <p>Editando : {selectedEditora.nome}</p>}
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
                  defaultValue={selectedEditora?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome da editora"
                  id="nome"
                  name="nome"
                  defaultValue={selectedEditora?.nome}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o endereço do editora"
                  id="endereco"
                  name="endereco"
                  defaultValue={selectedEditora?.endereco}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o endereço da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a cidade da editora"
                  id="cidade"
                  name="cidade"
                  defaultValue={selectedEditora?.cidade}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a cidade da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite a UF da editora"
                  id="uf"
                  name="uf"
                  defaultValue={selectedEditora?.uf}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a UF da editora.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o telefone da editora"
                  id="telefone"
                  name="telefone"
                  defaultValue={selectedEditora?.telefone}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o telefone da editora.
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
