import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './SingleGr.scss';
import Navbar from '../../components/navbar/Navbar';
import { getTasks } from '../../server/getTasks/getTasks';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../server/firebase/firebase-config-task';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { motion } from "framer-motion";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const SingleGr = () => {

  //нужнен для того чтобы проверять 6 секундный запрос есть ли данные
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  // Получение список групп и файла REDUX
  const [gr, setGr] = useState([]); 

  // получение данных именно у той группы например именнно: bis-2-22
  const [dataTasks, setDataTasks] = useState([]); 

  // парамс чтобы получить айди как параметр и дальше сним работать
  const params = useParams(); 

  // Блок который просит пин код чтобы удалить задание
  const [visibleDeleteBlock,setVisibleDeleteBlock] = useState(false)
  
  //Айди которое передается с иконки на функцию чтобы удалить задачу находя ее по ID
  const [taskIdForDelete,setTaskIdForDelete] = useState(null)
  
  // Данные из инпута, пин код чтобы подтвердить 
  const [codeFromUser, setCodeFromUser] = useState(null)

  // хук который отвечает на проверку пароля 
  const [visibleErrorAlert, setVisibleErrorAlert] = useState(false)

  // хук который отвечает на проверку пароля 
  const [visibleSuccessAlert, setVisibleSuccessAlert] = useState(false)

  // хук который определяет яв-ся ли группа в и избранных
  const [isFav,setIsFav] = useState(false)

  // в эту переменную приходят данные из redux и потом к setGr
  const a = useSelector((state) => state.grMini);

  const [groupIdSingle , setGroupIDSingle] = useState()

  // для анимации таблицы

  const divVariants = {
    visible: i => ({
        opacity: 1 ,
        transition: {
            delay: i * 0.2,
        }
    }),
    hidden: {
        opacity: 0
    }
}

useEffect(() => {
  const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  setIsFav(currentFavorites.includes(String(groupIdSingle)));
}, [groupIdSingle]);

  // тут мы переобразуем params в числовое значение, чтобы найти нужную группу \
  // и если находим то фильтрируем по АЙДИ чтобы найти нужную группу

  useEffect(() => {
    // переобразование str to int
    const numericId = Number(params.id.substring(1));
    setGroupIDSingle(numericId)

    // фильтрация по айди чтобы найти нужную группу
    const b = a.filter((gr) => gr.id === numericId);

    // и тут мы даем значение к gr уже фильтрированную переменную
    setGr(b);


    // в этой части кода происходит 
    // если есть т.е что то пришло из redux, мы даем его fName как путь к Firebase 
    // чтобы получить задачи именно из этой группы

    if (b.length > 0) {

      // получаем fName в этом ключе содержится такие данные как bis-1-22 , bis-2-22
      // и так далее и это есть путь к базе 
      getTasks(b[0].fName, (tasks) => {
        // Сортируем задачи по дате, новые вверху
        const sortedTasks = tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
        setDataTasks(sortedTasks);
      });
    } else {
      console.log('Ошибка в длине массива');
      alert("error")

      // через три секунды перезагружаем страницу
      setTimeout(() => {
        window.location.reload()
      } ,3000)
    }
  }, [params]);

  // function for delete Task 
  // функция котоая удаляет задачу проверяя код группы 
  const handleDeleteTask = async(taskID) => {
    try {
      // тут ищут задачу у которого айлди равен taskID
      const taskToDelete = dataTasks.find((task) => task.id === taskID);

      //если есть такая задача с такой ID то -> 
      if (taskToDelete) {

        // тут проверка кода группы для безопасности
        if (gr[0].code == codeFromUser) {

          //если код верный, то показываем алерт "успешно"
          setVisibleSuccessAlert(true)

          // await чтобы дать понять firebase что нужно удалить данные
          await deleteDoc(doc(db , gr[0].fName , taskID));

          // и убираем блок удаление 
          setVisibleDeleteBlock(false)

          //через три секунды изменяем на false чтобы скрыть
          setTimeout(() => {
            setVisibleSuccessAlert(false)
          },3000)

          //тут мы фильтрируем данные данные и убираем ту задачу которую удалили 
          setDataTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID))

        }
        else {
          // если код не верен 

          // установливаем setVisibleErrorAlert на true чтобы увидеть alert
          setVisibleErrorAlert(true)

          // через 3 секунды его изменяем на false чтобы скрыть 
          setTimeout(() => {
            setVisibleErrorAlert(false)
          },3000)
        }
      }
      else {
        window.location.reload()
      }
    } catch (error) {
      console.log("error: " + error)
      //обновляем страницу при ошибке 
      setTimeout(() => {
        window.location.reload()
      },5000)
    }
  }

  const addOrRemoveFavorite = (grID) => {
    grID = String(grID); // Преобразуем grID в строку

    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Если grID уже есть в избранных, удаляем его
    if (currentFavorites.includes(grID)) {
        const newFavorites = currentFavorites.filter(id => id !== grID);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFav(false)
    } else {
        // В противном случае добавляем grID в избранные
        currentFavorites.push(grID);
        localStorage.setItem('favorites', JSON.stringify(currentFavorites));
        setIsFav(true)
    }
    
}

useEffect(() => {
  if (dataTasks.length === 0) {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 6000);  // Устанавливаем таймер на 6 секунд

    return () => clearTimeout(timer);  // Очищаем таймер при размонтировании компонента
  }
}, [dataTasks]);






  return (
    <div>
      <div className="singleGr">

      {visibleSuccessAlert && 
          <Alert severity="success">
              <AlertTitle>Успешно</AlertTitle>
              Задача успешно удалено
          </Alert>
      }

      {visibleErrorAlert && 
            <Alert severity="error">
                <AlertTitle>Ошибка</AlertTitle>
                Не верен код группы
            </Alert>
      }


        <Navbar />
        <div className="container">
          {gr.length > 0 ? (
            <p className="s-grName">
              {gr[0].grName}
              {isFav ? 
                <motion.div
                whileHover={{scale: [null, 1.5,1.4]}}
                transition={{duration: 0.3}}
                >
                  <FavoriteIcon onClick={() => addOrRemoveFavorite(groupIdSingle)} style={{marginLeft: "30px"}} /> 
                </motion.div>
                  : 
                  <motion.div
                  whileHover={{scale: [null, 1.5,1.4]}}
                  transition={{duration: 0.3}}
                  >
                    <FavoriteBorderIcon onClick={() => addOrRemoveFavorite(groupIdSingle)} style={{marginLeft: "30px"}} />
                  </motion.div>
              }
              </p>          ) : (
            <p>Loading...</p>
          )}
          <div className='tHead'>
            <p>Дисциплина</p>
            <p  style={{marginLeft:'280px'}}>Дата</p>
            <p  style={{marginLeft:'70px'}}>Автор</p>
            <p  style={{marginLeft:'300px'}}>Комментарии</p>
          </div>

          <div className={visibleDeleteBlock ? 'checkPinBlock' : "checkPinBlockHide"} >
            <p>Введите пин код</p>
            <input onChange={(e) => {setCodeFromUser(e.target.value)}} className='checkPinBlock-input' maxLength={4}  placeholder='1234' type="text" />
            <p className='deleteBtn' onClick={() => handleDeleteTask(taskIdForDelete)}>Удалить</p>
            <p className='closeDeleteBlock' onClick={() => {setVisibleDeleteBlock(false)}}>x</p>
          </div>

            {dataTasks.length > 0 ?  (
              dataTasks.map((task , i) => (
                <motion.div 
                key={task.id} 
                className="task"
                variants={divVariants}
                initial="hidden"
                animate="visible"
                custom={i}

                >
                  <p className='task-discipline'>{task.discipline}</p>
                  <p className='task-date'>{task.date}</p>
                  <p className='task-author'>{task.author}</p>
                  <p className='task-comments'>{task.comments}</p>
                  <DeleteIcon 
                  onClick={() => {
                    setVisibleDeleteBlock(true)
                    setTaskIdForDelete(task.id)}
                  } className='deleteIcon' />
                </motion.div>
              ))
            ) : 
              loadingTimeout ?  (
                <p>В группе нет ни одной задачи</p>
              )
             : (
              <CircularProgress className='loading-single'  />
            )}


        </div>
      </div>
    </div>
  )
};

export default SingleGr
