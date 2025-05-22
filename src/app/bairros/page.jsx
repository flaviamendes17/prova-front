'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Bairro.module.css';
import { useRouter } from 'next/navigation';
import { Pagination, Modal, Card, Skeleton } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

export default function Bairros() {
    const [data, setData] = useState ({
        bairros: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        bairro: null,
        ocorrencias: null,
        loading: false,
    });

    useEffect(() => {
        const fetchBairros = async () => {
            try {
                const response = await axios.get('http://SEU_BACKEND_URL/api/bairros', {
                    headers: {
                        'x-api-key': '15D2dm2RED0umccWIl6A'

                    }
                });
                setData(prev => ({
                    ...prev,
                    bairros: response.data,
                    loading: false,
                }));
            } catch (error) {
                toast.error('Erro ao buscar bairros!');
                setData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchBairros();
    }, []);

const paginatedBairros = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.bairros.slice(start, start + data.pageSize);
};

return (
    <div>
        <h1 className={styles.title}>Bairros</h1>
        <div className={styles.bairrosContainer}>
            {data.loading ? (
                <Skeleton active />
            ) : (
                paginatedBairros().map((bairro) => (
                    <Card
                        key={bairro.id}
                        title={bairro.nome}
                        className={styles.card}
                        onClick={() => {
                            setModalInfo({
                                visible: true,
                                bairro: bairro.nome,
                                loading: true,
                            });
                            axios.get(`http://SEU_BACKEND_URL/api/bairros/${bairro.id}/ocorrencias`, {
                                headers: {
                                    'x-api-key': '15D2dm2RED0umccWIl6A'
                                }
                            })
                            .then(response => {
                                setModalInfo(prev => ({
                                    ...prev,
                                    ocorrencias: response.data,
                                    loading: false,
                                }));
                            })
                            .catch(error => {
                                toast.error('Erro ao buscar ocorrências!');
                                setModalInfo(prev => ({ ...prev, loading: false }));
                            });
                        }}
                    >
                        {bairro.nome}
                    </Card>
                ))
            )}
        </div>
        <Pagination
            current={data.current}
            pageSize={data.pageSize || 10}
            total={data.bairros.length}
            onChange={(page, pageSize) => setData(prev => ({
                ...prev,
                current: page,
                pageSize: pageSize,
            }))}
            style={{ marginTop: 16, textAlign: 'center' }}
        />
        <Modal
            open={modalInfo.visible}
            title={modalInfo.bairro}
            onCancel={() => setModalInfo({ visible: false, bairro: null, ocorrencias: null, loading: false })}
            footer={null}
        >
            {modalInfo.loading ? (
                <Skeleton active />
            ) : (
                <div>
                    <h3>Ocorrências:</h3>
                    <pre>{JSON.stringify(modalInfo.ocorrencias, null, 2)}</pre>
                </div>
            )}
        </Modal>
        <ToastContainer />
    </div>
)
}
