'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Bairro.module.css';
import { useRouter } from 'next/navigation';
import { Pagination, Modal, Card, Skeleton } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

const HEADER = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Bairros() {
    const [data, setData] = useState({
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

    const [redirectLoading, setRedirectLoading] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        const fetchBairros = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/bairros', {
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

    const handleRedirect = (bairroId) => {
        setRedirectLoading(true); 
        setTimeout(() => {
            router.push(`/bairros/${bairroId}`); 
        }, 2000); 
    };

    const paginatedBairros = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.bairros.slice(start, start + data.pageSize);
    };

    return (
        <div>
            {redirectLoading && ( 
                <div className={styles.loadingOverlay}>
                    <img src="/carregando.gif" alt="Carregando..." className={styles.loadingGif} />
                </div>
            )}
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
                            onClick={() => handleRedirect(bairro.id)} 
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
            <ToastContainer position='top-right' autoClose={4500} />
        </div>
    );
}
