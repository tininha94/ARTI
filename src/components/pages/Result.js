import { useLocation } from 'react-router-dom/dist';
import { useState } from 'react';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';

import n_signal from '../../assets/images/n_signal.png'
import s_signal from '../../assets/images/s_signal.png'
import v_signal from '../../assets/images/v_signal.png'
import f_signal from '../../assets/images/f_signal.png'
import q_signal from '../../assets/images/q_signal.png'
import pie_chart from '../../assets/images/pie_chart.png'

import '../../assets/commons.css'
import '../../assets/result.css';
import ReactApexChart from 'react-apexcharts';

export default function Result() {
    const location = useLocation();
    const predictionResult = JSON.parse(location.state);

    const nCount = predictionResult[0][1];
    const sCount = predictionResult[1][1];
    const vCount = predictionResult[2][1];
    const fCount = predictionResult[3][1];
    const qCount = predictionResult[4][1];

    const totalCount = nCount + sCount + vCount + fCount + qCount;
    const nPercentage = ((nCount / totalCount) * 100).toFixed(2) +"%";
    const sPercentage = ((sCount / totalCount) * 100).toFixed(2) + "%";
    const vPercentage = ((vCount / totalCount) * 100).toFixed(2) + "%";
    const fPercentage = ((fCount / totalCount) * 100).toFixed(2) + "%";
    const qPercentage = ((qCount / totalCount) * 100).toFixed(2) + "%";

    const nDescription = "Batimentos normais";
    const sDescription = "Batimentos prematuros supraventriculares";
    const vDescription = "Contrações ventriculares prematuras";
    const fDescription = "Fusão de batimentos ventriculares e normais";
    const qDescription = "Batimentos não classificados";


    const getSinalImage = () => {
        let maxSignalPosition = 0; 
        let maxCount = 0; 
        for(let i=0; i < predictionResult.length; i++){
            if(predictionResult[i][1] > maxCount ){
                maxCount = predictionResult[i][1];
                maxSignalPosition = i;
            } 
        }

        switch (maxSignalPosition) {
            case 0:
                return n_signal;
            case 1:
                return s_signal;
            case 2:
                return v_signal;
            case 3:
                return f_signal;
            default:
                return q_signal;
        }

    }

    const series = [nCount, sCount, vCount, fCount, qCount];
    const options = {
        chart: {type: 'pie',},
        labels: [nDescription, sDescription, vDescription, fDescription, qDescription],
    };


    return (
        <div className='inner_page'>
            <h1 className='title'>Resultado</h1>
            <div className='result_section'>
                <div className='initial_section'>
                    <div className='result_image_section'>
                        <img className='image' src={getSinalImage()} alt="Minha Imagem" />
                    </div>
                    <div className='percentages_section'>
                        <div className='section_title'> Ocorrências  </div>
                        <ul>
                            <li>{nCount} - {nDescription}</li>
                            <li>{sCount} - {sDescription}</li>
                            <li>{vCount} - {vDescription}</li>
                            <li>{fCount} - {fDescription}</li>
                            <li>{qCount} - {qDescription}</li>
                        </ul>
                    </div>
                </div>
                <div className='initial_section'>
                    <div className='percentages_section'>
                        <div className='section_title'> Porcentagens  </div>
                        <ul>
                            <li>{nPercentage} - {nDescription}</li>
                            <li>{sPercentage} - {sDescription}</li>
                            <li>{vPercentage} - {vDescription}</li>
                            <li>{fPercentage} - {fDescription}</li>
                            <li>{qPercentage} - {qDescription}</li>
                        </ul>
                    </div>
                    <div className='result_image_section'>
                        <ReactApexChart options={options} series={series} type="pie" />
                    </div>
                </div>
                <div className='alert_section'>
                    <div className='alert_icon'>
                        <AntDesignIcon name="exclamationcircleo" size={30} color="white" />
                    </div>
                    <div className='alert_text'>
                        Nunca é demais lembrar o peso e o significado destes problemas, uma vez que o entendimento das metas propostas desafia a capacidade de equalização das regras de conduta normativas.
                    </div>
                </div>
            </div>
        </div>
    );
}

