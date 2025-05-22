'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';


function HomePage() {
    const [state, setState] = useState(null);
    const router = useRouter();

    useEffect(() => {

}, []);

    return (
    <div className={styles.container}>
        <div className='header'>
            <h1 className={styles.h1}>Flavia R.A. Mendes!</h1>
            <h2 className={styles.h2}>2TDS1 👩🏻‍💻</h2>
        </div>
        <div className='content-image'>
            <img className={styles.profileImage}src = "/eu.jfif" alt = "Flavia Mendes" width = "200" height = "200"/>
        </div>
    <div className='content'>
    <h3 className={styles.h3}>Saiba mais ⤵</h3>
    <p className={styles.p}> 3º semestre como técnica aprendiz em desenvolvimento de sistemas, na turma 1.</p>
    <p className={styles.p}>Disciplina de front-end 🎨</p>
    <p className={styles.instrutores}>Instrutores: Marcelo Carboni e Thiago Ferreira.</p>
    <p className={styles.p}>Esse projeto consiste na criação de um front-end que consuma uma API própria, nesse caso o conteúdo se trata de bairros,</p>
    <p className={styles.p}>aonde cada um se relaciona com operações, ou seja, cada bairro apresenta um problema que está acontecendo. </p>
    <p className={styles.p}> O propósito é que os moradores tenham acesso rápido ao que está ocorrendo.</p>
    </div>

{}
    </div>
);
}

export default HomePage;
