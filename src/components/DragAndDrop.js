import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';

import '../assets/dragAndDrop.css';
import '../assets/commons.css';

const DragAndDrop = props => {

    const wrapperRef = useRef(null);
    const [targetFile, setTargetFile] = useState("");
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isWrongFormat, setIsWrongFormat] = useState(false);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');
  
    useEffect(() => {
        if (isWrongFormat) {
            const timer = setTimeout(() => {
                setIsWrongFormat(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isWrongFormat]);

    const changeFile = (event) => {
        const file = event.target.files[0]
        let fileExtension = file.name.split('.').pop();
        if (fileExtension == 'dat') {
            setTargetFile(file)
            setIsFileUploaded(true);
            props.onFileChange(file);
        } else {
            setIsWrongFormat(true)
        }
    }

    const fileRemove = () => {
        setIsFileUploaded(false);
        setTargetFile("")
        props.onFileChange("");
    }

    return (
    <>
        <div className='drop-component'>
            {!isFileUploaded && (
                <div
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <AntDesignIcon name="addfile" size={30} color="#00dae2" />
                    <div className="drop-file-input__label">
                        Drag & Drop your files here <br/>
                        <span className='complementary_text'>or browse</span>
                    </div>
                    <input className="drop-file-input" type="file" accept='.dat' value="" onChange={changeFile} />
                </div>
            )}
            <div className='inavilid_formt_text'>
                {!isFileUploaded && isWrongFormat && (
                    <div style={{marginTop: '2px'}}>
                        <AntDesignIcon name="exclamationcircleo" size={20} color="red" />
                        <span style={{ color: 'red' }} > Formato invalido: Por favor, selecione um arquivo .dat </span>
                    </div>
                )}
            </div>
            { isFileUploaded && (
                    <div className="drop-file-preview">
                        <div className="drop-file-preview__item">
                            <AntDesignIcon name="file1" size={70} color="#00dae2" />
                            <div className="drop-file-preview__item_text">                            
                                {targetFile.name} <br/>
                                <span className='complementary_text' >Arquivo carregado com sucesso</span>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove()}>x</span>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    </>
    );
}

DragAndDrop.propTypes = {
onFileChange: PropTypes.func
}

export default DragAndDrop;