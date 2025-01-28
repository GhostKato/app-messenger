'use client';
import Button from '@/components/Button';
import MessageForm from '@/components/MessageForm';
import MessageText from '@/components/MessageText';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";

const Message: React.FC = () => {  
  const messages = [
    { id: 1, text: 'Привіт! Радий поспілкуватися з тобою. Розкажи, будь ласка, трохи про свій досвід роботи з React.', from: '2', for: '1' },
    {
      id: 2, text: 'Привіт! Дякую за можливість інтерв\'ю. У мене кілька років досвіду роботи з React. Працював над створенням SPA, інтеграцією API, оптимізацією продуктивності та управлінням станом за допомогою Redux і Context API. Також маю досвід з TypeScript, React Router і Styled Components.', from: '1', for: '2' 
    },
    { id: 3, text: 'Чудово. Як би ти оптимізував продуктивність React-додатку?', from: '2', for: '1' },
    { id: 4, text: 'Мемоізація компонентів, мемоізація функцій і значень, динамічне імпортування, оптимізація списків, управління станом, аналіз рендерів.', from: '1', for: '2' },
    { id: 5, text: 'Супер! А як би ти пояснив різницю між useEffect, useLayoutEffect та useInsertionEffect?', from: '2', for: '1' },
    { id: 6, text: 'useEffect: виконується після рендерингу, асинхронно. Використовується для виконання побічних ефектів, як-от запити до API або робота з DOM.', from: '1', for: '2' },
    { id: 7, text: 'useLayoutEffect: виконується синхронно після рендерингу, але перед тим, як браузер намалює сторінку. Використовується, коли потрібно змінити DOM перед відображенням користувачу.', from: '1', for: '2' },
    { id: 8, text: 'useInsertionEffect: виконується перед вставкою стилів у DOM. Застосовується рідко, зазвичай для бібліотек, які працюють із стилями.', from: '1', for: '2' },
    { id: 9, text: 'А які бібліотеки для управління станом ти використовував і в яких випадках обираєш ту чи іншу?', from: '2', for: '1' },
    { id: 10, text: 'Redux: коли додаток має складну структуру даних і багато компонентів потребують доступу до одного стану. Особливо корисний у поєднанні з Redux Toolkit.', from: '1', for: '2' },
    { id: 11, text: 'Context API: підходить для менших проєктів або для передачі даних між компонентами на декількох рівнях.', from: '1', for: '2' },
    { id: 12, text: 'Також маю досвід із Zustand для легших проєктів та React Query для роботи з даними сервера.', from: '1', for: '2' },
];


   const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  const router = useRouter();

  const handleBackClick = () => {
    router.push('/message');
  };

  return (   
    <div className='message-id flex flex-col relative shadow-custom-inset min-h-screen bg-cover bg-center pb-[1px]'>     
      <Button variant="back" onClick={handleBackClick}><FaArrowLeft className='text-interaction group-hover:text-white w-[25px] h-[25px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px]'/></Button>
      <div  className="bg-cool-gradient bg-[length:200%_200%] animate-gradient-move shadow-custom p-[10px] md:p-[29px] xl:p-[32px]">
        <h1 className="text-3xl font-bold text-center">Messages</h1>
      </div>
      <ul  ref={listRef} className='flex flex-col flex-grow gap-[30px] overflow-auto p-[10px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black'>
        {messages.map((message) => (
          <MessageText key={message.id} message={message.text} from={message.from} />
        ))}        
      </ul>
       <MessageForm/>
    </div>
  );
}

export default Message;
