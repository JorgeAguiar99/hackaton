"use client"

import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react"
import { ButtonConfig, CardButton, CardCopyright, CardForm, CardImage, CardLogin, CardRememberMe, CardSenhaEmail, CardTitle, ImgTriodev, InputLogin, SizeImage } from "./styles";



export default function Login() {

    const router = useRouter();

    const refForm = useRef<any>();
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const status = useState('')

    // verifica se o parametro status existe na url
    const urlParams = new URLSearchParams(window.location.search);
    const urlStatus = urlParams.get("status");

    window.history.replaceState({}, document.title, "/" + "login");

    useEffect(() => {
        if (urlStatus == '1') {
            setToast(true)
            setToastMessage('Você precisa estar logado para acessar a página')
        }
    }, [])

    const submitForm = useCallback((e: any) => {
        e.preventDefault();
        if (refForm.current.checkValidity()) {
            setLoading(true)
            const objSalvar = {
                ra: e.target.ra.value,
            }

            axios.get('http://127.0.0.1:8000/login/' + objSalvar.ra)
                .then((resposta) => {

                    // Redireciona para a dashboard
                    router.push('/dashboard')
                })
                .catch((err) => {
                    setToast(true)
                    setLoading(false)
                    setToastMessage('Usuario não encontrado')
                })

        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [])



    return (
        <>
            <Loading loading={loading} />
            <ToastComponent
                show={toast}
                message={toastMessage}
                colors="danger"
                onClose={() => { setToast(false) }}
            />


            <CardLogin>

                <CardImage>
                    <SizeImage src="../img/logo.png" />
                </CardImage>


                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // paddingTop: 20
                }}>
                    <CardTitle >

                    </CardTitle>
                </div>

                <CardForm
                    className="row g-1 needs-validation"
                    noValidate
                    ref={refForm}
                    onSubmit={submitForm}

                >
                    <CardSenhaEmail>
                        <div className="input-group has-validadion">
                            <div className="col-md-12">
                                <InputLogin
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite seu R.A"
                                    id="ra"
                                    required
                                />

                                <div className="invalid-feedback">
                                    Por favor digite seu R.A
                                </div>
                            </div>
                        </div>
                    </CardSenhaEmail>

                    <CardButton className="col-md-12">
                        <ButtonConfig
                            className="btn btn-primary"
                            type='submit'
                            id="botao"
                        >
                            Entrar
                        </ButtonConfig>

                        <CardCopyright>
                            <ImgTriodev src="img/triodev.png" />
                        </CardCopyright>
                    </CardButton>
                </CardForm>

            </CardLogin>
        </>
    )
}