import React, { useState } from 'react'
import './CreateTask.scss'
import Navbar from '../../components/navbar/Navbar'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../server/firebase/firebase-config-task';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import {motion} from 'framer-motion'




const CreateTask = () => {

  const [infoVisible,setInfoVisible] = useState(false);
  const [successCreate,setSuccessCreate] = useState(false)
  const [errorCreate,setErrorCreate] = useState(false)
  const [emptyError,setEmptyError] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)


  // для анимации 
  const divVariants = {
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.2 
      }
    }),
    hidden: {
      opacity: 0
    }
  }


  const grs = useSelector(state => state.grMini);
  console.log(grs)


  const createTask = (e) => {
    e.preventDefault();

    // код группы которая будет у всех групп. Код будет уникальным чтобы студенты не смогли создать задачу не на своем группе
    const codeGr = e.target[0].value 
    // имя дисцип
    const discipline = e.target[1].value
    const author = e.target[2].value
    const date = e.target[3].value
    const comments = e.target[4].value

    // проверка на длину не пустые ли они 
    if (
      discipline.trim().length > 0 &&
      author.trim().length > 0 &&
      date.trim().length > 0 &&
      codeGr.trim().length > 0 &&
      comments.trim().length > 0
    ) {

      const task = {discipline,author,date,comments};
      const filterTask = grs.find((gr) => (gr.code === codeGr));

      if (filterTask) {
        const createTaskFireBase = async() => {
          const taskCollectionRef = collection(db, filterTask.fName)
          try {
            setLoadingCreate(true) //установливаем значение true если регистация произайдет правильно
            await addDoc(taskCollectionRef,task)
            setSuccessCreate(true) //установливаем значение true если регистация произайдет правильно
            setLoadingCreate(false) //установливаем значение true если регистация произайдет правильно

            // после 3 секунды убираем true на  false
            setTimeout(() => {
              setSuccessCreate(false)
            },3000)

            e.target.reset()
            
          } catch (error) {

              console.log("error: " + error)
            // перезагрузка страницы через 3 секунды если будет не предвиденная ошибка
            setTimeout(() => {
              window.location.reload()
            },3000)
          }
        }

        createTaskFireBase()
      }
      else {
        setErrorCreate(true); // установливаем значение true если не найдет такую группу
        
        // через 3 сеунды убираем true на false 
        setTimeout(() =>{
          setErrorCreate(false)
        },3000)
      }
    }
    else {
      setEmptyError(true);

      // через 3 сек удаляем ошибку
      setTimeout(()=>{
        setEmptyError(false)
      },3000)
    }
  }

  const handleVisibleInfo = () => {
    setInfoVisible(!infoVisible)
  }


  return (
    <div>
        <div className="createTask">
            {successCreate && (
              <Alert severity="success" className='alert'>
              <AlertTitle>Успешно</AlertTitle>
                Задача успешно создано
              </Alert>
            )}
            {emptyError && (
              <Alert severity="error" className='alert'>
              <AlertTitle>Ошибка</AlertTitle>
                Заполните все поля
              </Alert>
            )}
            {errorCreate && (
              <Alert severity="error" className='alert'>
              <AlertTitle>Нет такой группы</AlertTitle>
                Проверьте код группы. <b>Ошибка в коде группы</b>
              </Alert>
            )}
            <Navbar />
            <div className="container">
                <h1 className='create-text-1'>Create Task</h1>

                <form onSubmit={createTask} className='createForm' action="">
                  <QuestionMarkIcon className='questionIcon'  onClick={handleVisibleInfo} />
                  <h4 style={{textAlign:'center'}}>Регистрация</h4>
                  <motion.input
                  variants={divVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  
                  
                   type="text" placeholder='код группы' />
                  <motion.input
                  variants={divVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"

                  
                   type="text" placeholder='Дисциплина' />
                  <motion.input
                  variants={divVariants}
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  
                  
                   type="text" placeholder='Автор (ваше имя)' />
                  <motion.input
                  variants={divVariants}
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  
                  
                   type="date" />
                  <motion.textarea
                  variants={divVariants}
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  
                  
                   maxLength={250} type="text" placeholder='Коментарии' />
                  <br />
                  {loadingCreate ? (
                    <CircularProgress className='loadingCreate'  />
                  ) : (
                  <motion.button 
                  className='createForm-btn' 
                  type='submit'
                  variants={divVariants}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                  >Создать задание</motion.button>

                  )}
                  
                </form>
            </div>

            <div style={infoVisible ? {display: 'block'} : {display:'none'}} className='createTask-infoBlock'>
              <p><b>Чтобы зарегистрировать задачу, выполните следующие шаги:</b></p>

              <ol>
                <li>Выберите дисциплину: Укажите область или предмет, к которому относится задача, например, "Математика" или "История".</li>
                <li>Укажите автора: Введите имя автора задачи, то есть ваше имя или имя того, кто создает задачу.</li>
                <li>Установите текущую дату: Выберите сегодняшнюю дату как дату создания задачи.</li>
                <li>Добавьте комментарии: Предоставьте дополнительные комментарии или описание задачи, чтобы понять ее суть и требования.</li>
              </ol>

              <p>После выполнения этих шагов вы сможете зарегистрировать задачу и увидеть ее детали, включая выбранную дисциплину, имя автора, текущую дату и комментарии.</p>
            </div>

        </div>
    </div>
  )
}

export default CreateTask