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

interface cursosProps {
  id: number;
  nome: string;
  coordenador: string;
  duracao: number;
  created_at: string;
  updated_at: string;
}

export default function Listagem() {
  const refForm = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState<Array<cursosProps>>();
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCurso, setSelectedCurso] = useState<cursosProps>();

  const openModal = (curso: cursosProps) => {
    setSelectedCurso(curso);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    loadCursos();
  }, []);

  const loadCursos = function () {
    axios.get("http://127.0.0.1:8000/cursos").then((resposta) => {
      setCursos(resposta.data.curso);
      setLoading(false);
    });
  };

  const excluirCursos = useCallback((id: number) => {
    setLoading(true);
    axios
      .delete("http://127.0.0.1:8000/cursos/" + id)
      .then((resposta) => {
        setLoading(false);
        loadCursos();
      })
      .catch((err) => {
        setToastMessage(err.message);
        setLoading(false);
        setToast(true);
      });
  }, []);

  const submitForm = useCallback((e: any) => {
    e.preventDefault();
    if (refForm.current.checkValidity()) {
      setLoading(true);
      const objAtualizar = {
        id: e.target.id.value,
        nome: e.target.nome.value,
        coordenador: e.target.coordenador.value,
        duracao: e.target.duracao.value,
      };
      axios
        .put("http://127.0.0.1:8000/cursos/" + objAtualizar.id, objAtualizar)
        .then((resposta) => {
          loadCursos();
          setShowModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
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
        colors="danger"
        onClose={() => {
          setToast(false);
        }}
      />
      <LayoutDashboard active="cursos">
        <ButtonWrapper>
          <ButtonCad href={"/cursos/cadastro"}>Cadastrar</ButtonCad>
        </ButtonWrapper>
        <TableWrapper>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Coordenador</TableHeader>
                <TableHeader>Duração</TableHeader>
                <TableHeader>Ações</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {cursos?.map((rec, index) => {
                return (
                  <>
                    <TableRow>
                      <TableCell key={index}>{rec.id}</TableCell>
                      <TableCell>{rec.nome}</TableCell>
                      <TableCell>{rec.coordenador}</TableCell>
                      <TableCell>{rec.duracao}</TableCell>
                      <TableCell>
                        <ButtonEdit onClick={() => openModal(rec)}>
                          <Pencil />
                        </ButtonEdit>
                        <ButtonDel
                          onClick={() => {
                            excluirCursos(rec.id);
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
          <Modal.Title>Editar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedCurso && <p>Editando : {selectedCurso.nome}</p>}
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
                  defaultValue={selectedCurso?.id}
                  hidden
                />
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome do curso"
                  id="nome"
                  name="nome"
                  defaultValue={selectedCurso?.nome}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o nome do curso.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="text"
                  className="form-control"
                  placeholder="Digite o coordenador do curso"
                  id="coordenador"
                  name="coordenador"
                  defaultValue={selectedCurso?.coordenador}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite o coordenador do curso.
                </div>
              </div>

              <div className="col-md-12">
                <InputLogin
                  type="number"
                  className="form-control"
                  placeholder="Digite a duração do curso"
                  id="duracao"
                  name="duracao"
                  defaultValue={selectedCurso?.duracao}
                  required
                />

                <div className="invalid-feedback">
                  Por favor digite a duração do curso.
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
