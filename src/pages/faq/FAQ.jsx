import React from 'react';
import './FAQ.scss';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../../components/navbar/Navbar'
import Navbar from '../../components/navbar/Navbar';
import { motion } from "framer-motion";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';







const FAQ = () => {



  return (
    <div>
        <div className="faq">
            <div className="container">
                <Navbar />
                <h2 className="faq-text-1">Информация о сайте</h2>
                <div className="accordion">
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography
                    ><b>Для чего нужен этот сайт?</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Данный сайт разработан для студентов и
                     школьников, чтобы они могли 
                     систематизировать и сохранять свои 
                     задачи и обязанности в одном месте. 
                     Я сам многократно сталкивался с проблемой 
                     потери важных записей, сделанных на 
                     бумажках. Наш ресурс призван упростить 
                     жизнь пользователей, предоставляя удобное 
                     и надёжное средство для хранения их 
                     задач
                    </Typography>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><b>Могу ли я добавить в платформу свою группу?</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Вы можете добавить свою группу 
                    или класс на нашу платформу. 
                    Однако, это может занять некоторое время.
                     Как процесс будет выглядеть? Вам необходимо 
                     связаться с администратором сайта, 
                     указать название вашей группы или класса,
                      после чего вам будет предоставлен уникальный
                       пин-код для доступа. Ожидание составляет
                        несколько часов, так как нам требуется 
                        время для подготовки кода и настройки
                         платформы. Для связи с администрацией
                          вы можете использовать WhatsApp или 
                          Telegram, обратившись по номеру +996
                           (707) 78 00 48.
                    </Typography>
                    </AccordionDetails>

                    
                    </Accordion>
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><b>Мне не отвечают?!</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Если в течение 24 часов после 
                    отправки вашего сообщения вам не
                     приходит ответ, рекомендуем 
                     связаться с нами через WhatsApp 
                     или Telegram по номеру +996 (557)
                      78 00 48. Пожалуйста, отправьте 
                      ту же информацию, которую вы ранее 
                      отправляли на номер +996 (707) 
                      78 00 48, и дополнительно укажите 
                      вашу претензию относительно того, 
                      что вы не получили код доступа в 
                      установленные сроки. Обратите 
                      внимание: мы рассматриваем жалобы 
                      только после истечения 24-часового 
                      периода с момента вашего 
                      первоначального обращения.
                    </Typography>
                    </AccordionDetails>

                    
                    </Accordion>
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography><b>Потерял код группы</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                    Если вы потеряли или 
                    забыли пин-код вашей группы,
                     просьба связаться с нами по 
                     номеру +996 (707) 78 00 48. Запрос на
                      предоставление пин-кода может быть 
                      осуществлен только старостой группы.
                       Староста — это тот человек, который 
                       первоначально обратился к нашей
                        платформе с запросом на создание 
                        данной группы. Без подтверждения
                         от старосты мы не можем 
                         предоставить пин-код группы в 
                         интересах её безопасности.
                    </Typography>
                    </AccordionDetails>

                    
                    </Accordion>
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography
                    ><b>По другим вопросам или нужен администратор</b></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <ul>
                            <li style={{color:"green"}}>WhatsApp - +996 (707) 78 00 48</li>
                            <li style={{color:"blue"}} >Telegram - +996 (707) 78 00 48</li>
                            <li>Gmail - nurjigitusupov1891@gmail.com</li>
                        </ul>
                    </Typography>
                    </AccordionDetails>
                    </Accordion>

                </div>

                <div className="socialMedia">
                    
                    <motion.a 
                    href='https://api.whatsapp.com/send/?phone=996707780048&text&type=phone_number&app_absent=0'
                      initial={{ scale: 0 }}
                      animate={{ rotate: 360, scale: 1 }}
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,

                      }}
                    className="wi">
                        <WhatsAppIcon className='faq-icon wa' />
                    </motion.a>
                    <motion.a
                    href='https://t.me/nurba1891'
                      initial={{ scale: 0 }}
                      animate={{ rotate: -360, scale: 1 }}
                      whileHover={{
                        scale: 1.3
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    className="ti">
                        <TelegramIcon className='faq-icon telegram' />
                    </motion.a>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FAQ
