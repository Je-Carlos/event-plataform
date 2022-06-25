import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";
import imgUrl from '../assets/code-mockup.png';
import imgReact from '../assets/ReactJsIcon.svg';


export function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [CreateSubscriber, {loading}] = useCreateSubscriberMutation();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    await CreateSubscriber({ variables: { name, email } });
    
    navigate("/event/lesson/abertura-do-evento-ignite-lab");
  }
  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px] ">
          <Logo />
          <img
            src={imgReact}
            alt="Logo React"
            className="absolute bg-center bg-no-repeat cover top-2"
          />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              className="bg-gray-900 rounded px-5 h-10 text-sm"
              type="text"
              placeholder="Seu nome completo..."
              onChange={(event) => setName(event.target.value)}
            />

            <input
              className="bg-gray-900 rounded px-5 h-10 text-sm"
              type="email"
              placeholder="Digite seu melhor email..."
              onChange={(event) => setEmail(event.target.value)}
            />

            <button type='submit' disabled={loading} className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src={imgUrl} alt="" className="mt-10"></img>
    </div>
  );
}
