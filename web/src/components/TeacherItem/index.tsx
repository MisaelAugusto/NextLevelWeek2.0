import React from 'react';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/30798460?s=460&v=4"
          alt="Misael Augusto"
        />
        <div>
          <strong>Misael Augusto</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Apaixonado por programação e dar vida a aplicações.
        <br />
        <br />
        Acredita que a tecnologia pode transformar a vida das pessoas sempre
        para melhor.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 40,00</strong>
        </p>
        <button type="button">
          <img src={WhatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
