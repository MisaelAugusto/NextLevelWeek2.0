import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import PageHeader from '../../components/PageHeader';

import WarningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import api from '../../services/api';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [cost, setCost] = useState('');
  const [subject, setSubject] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 0, from: '', to: '' }
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(index: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, position) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        cost: Number(cost),
        subject,
        schedule: scheduleItems
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');

        setTimeout(() => history.push('/'), 2000);
      })
      .catch(() => {
        alert('Erro no cadastro');
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer ensinar!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={e => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={e => {
                setWhatsapp(e.target.value);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={e => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
              }}
              options={[
                { value: 'Português', label: 'Português' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'História', label: 'História' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Artes', label: 'Artes' },
                { value: 'Química', label: 'Química' },
                { value: 'Física', label: 'Física' },
                { value: 'Educação Física', label: 'Educação Física' }
              ]}
            />

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={e => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={e => {
                      setScheduleItemValue(index, 'week_day', e.target.value);
                    }}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]}
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={e => {
                      setScheduleItemValue(index, 'from', e.target.value);
                    }}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={e => {
                      setScheduleItemValue(index, 'to', e.target.value);
                    }}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={WarningIcon} alt="Aviso importante" />
              Importante
              <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
