import React, { useState } from 'react'
import Request from '../Request'
import { useNavigate } from 'react-router-dom/dist';
import { GridLoader } from 'react-spinners';
import DragAndDrop from '../DragAndDrop';

import '../../assets/predict.css'
import '../../assets/commons.css'

export default function Predict() {
    const request = new Request()
    const [targetFile, setTargetFile] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const windowHeight = window.innerHeight;
    
    document.documentElement.style.setProperty('--window-height', `${windowHeight}px`)

    const onFileChange = (updloadedFile) => {
        setTargetFile(updloadedFile);
    }

    const verifyFile = () => {
        if (targetFile != "")
            submit()
    }

    const submit = () => {
        request.uploadFile(targetFile).then(() => {
            getResult()
        }).catch(error => {
            reponseToJson(error.json())
        })
    }

    const reponseToJson = (response) => {
        response.then(result => {
            setMessage(result.message)
        })
    }

    const getResult = () => {
        setIsLoading(true)
        request.getResult()
            .then(response => {
                response.json()
                    .then(jsonResponse => {
                        navigate("/result", { state: jsonResponse.message });
                    })
            }).catch(error => {
                reponseToJson(error.json())
            })

    }

    return (
        <div className="inner_page">
            {!isLoading && (
                <div>
                    <h1 className='title'>Analise seu próprio ECG</h1>
                    <p className='text' >Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o entendimento das metas propostas desafia a capacidade de equalização das regras de conduta normativas.</p>
                    <DragAndDrop onFileChange={(files) => onFileChange(files)}/>
                    {targetFile != "" && <input type="button" className='button' onClick={verifyFile} value="Analisar sinal" /> }
                    <p>
                        {message}
                    </p>
                </div>
            )}
            {isLoading && (
                <div className='loading'>
                    <GridLoader color="#00dae2" /> <br/>
                    <span> Analisando o arquivo </span>
                </div>
            )}
        </div>
    );
}
