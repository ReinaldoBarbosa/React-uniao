import React, { useEffect } from 'react';
import './Principal.css';

import Logo from '../../assets/logo.png';

/* Imagens featured */
import Ft1 from '../../assets/img/PrincipalImg/ft1.jpeg';
import Ft2 from '../../assets/img/PrincipalImg/ft2.jpg';
import Ft3 from '../../assets/img/PrincipalImg/ft3.jpeg';
import Ft4 from '../../assets/img/PrincipalImg/ft4.jpeg';
import Ft5 from '../../assets/img/PrincipalImg/ft5.jpeg';
import Coracao from '../../assets/img/PrincipalImg/3.png';

/* Imagens Volunteers */
import Empatia from '../../assets/img/PrincipalImg/7.png';
import Solidariedade from '../../assets/img/PrincipalImg/8.png';
import Cooperacao from '../../assets/img/PrincipalImg/6.png';

/* Importar bibliotecas externas */
import ScrollReveal from 'scrollreveal';
import { Link } from 'react-router-dom';
  
const Principal = () => {

    useEffect(() => {
        // Menu Function
        const myMenuFunction = () => {
          const menuBtn = document.getElementById("myNavMenu");
          menuBtn.classList.toggle("responsive");
        };
    
        // Header Shadow
        const headerShadow = () => {
          const navHeader = document.getElementById("header");
          if (window.scrollY > 50) {
            navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";
            navHeader.style.height = "70px";
            navHeader.style.lineHeight = "70px";
          } else {
            navHeader.style.boxShadow = "none";
            navHeader.style.height = "90px";
            navHeader.style.lineHeight = "90px";
          }
        };
    
        window.addEventListener('scroll', headerShadow);
    
        // Scroll Reveal
        const sr = ScrollReveal({
          origin: 'top',
          distance: '80px',
          duration: 2000,
          reset: true
        });
    
        sr.reveal('.featured-text-card', {});
        sr.reveal('.featured-name', { delay: 100 });
        sr.reveal('.featured-text-info', { delay: 200 });
        sr.reveal('.featured-text-btn', { delay: 200 });
        sr.reveal('.social_icons', { delay: 200 });
        sr.reveal('.text--info', { delay: 200 });
        sr.reveal('.featured-image', { delay: 300 });
        sr.reveal('.about-info', { delay: 100 });
        sr.reveal('.contact-info', { delay: 100 });
        sr.reveal('.section__title', { delay: 100 });
        sr.reveal('.new__description', { delay: 100 });
        sr.reveal('.new__card', { interval: 200 });
        sr.reveal('.project__card', { interval: 200 });
        sr.reveal('.top-header', {});
        sr.reveal('.ong__description', { delay: 100 });
    
    
        // Change Active Link
        const scrollActive = () => {
          const sections = document.querySelectorAll('section[id]');
          const scrollY = window.scrollY;
          sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
              } else {
                document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
              }
          });
        };
        window.addEventListener('scroll', scrollActive);
    
        // Cleanup event listeners on component unmount
        return () => {
          window.removeEventListener('scroll', headerShadow);
          window.removeEventListener('scroll', scrollActive);
        };
      }, []);
    
    
  return (
    <>
      <div className="container">
        <nav id="header">
          <div className="nav-logo">
            <img className="nav-img" src={Logo}  alt="Logo" />
          </div>
          <div className="nav-menu" id="myNavMenu">
            <ul className="nav_menu_list">
              <li className="nav_list">
                <a href="#home" className="nav-link active-link">Home</a>
                <div className="circle"></div>
              </li>
              <li className="nav_list">
                <a href="#volun" className="nav-link">Sou Voluntario</a>
                <div className="circle"></div>
              </li>
              <li className="nav_list">
                <a href="#ongs" className="nav-link">Sou Ong</a>
                <div className="circle"></div>
              </li>
              <li className="nav_list entrar">
                <a href="/Html/logon.html" className="nav-link">Entrar</a>
                <div className="circle"></div>
              </li>
            </ul>
          </div>
          <div className="nav-button">
            <button className="btn">
                <Link to={'/login'}>Entrar</Link>   
            </button>        
          </div>
          <div className="nav-menu-btn">
            <i className="uil uil-bars" onClick={() => myMenuFunction()}></i>
          </div>
        </nav>

        {/* ---- MAIN ---- */}
        <main className="wrapper">
          <section className="featured-box" id="home">
            <div className="featured-text">
              <div className="featured-name">
                <p>
                  Nossa plataforma quer <br />
                  divulgar Trabalhos <br />
                  Voluntarios de Ongs
                </p>
              </div>
              <div className="featured-text-info">
                <p>Juntos somos mais fortes</p>
              </div>
              <div className="featured-text-btn">
                <a className="sop" href="#ongs">
                  <button className="btn blue-btn">Saiba Mas</button>
                </a>
                <a href="#about">
                  <button className="btn">Sobre nos</button>
                </a>
              </div>
              <div className="social_icons">
                <div className="icon">
                  <img src={Ft1} alt="Foto 1" />
                </div>
                <div className="icon">
                  <img src={Ft2} alt="Foto 2" />
                </div>
                <div className="icon">
                  <img src={Ft3} alt="Foto 3" />
                </div>
                <div className="icon">
                  <img src={Ft4} alt="Foto 4" />
                </div>
                <div className="icon">
                  <img src={Ft5} alt="Foto 5" />
                </div>
                <div className="text--info">
                  <p>+ de 1000 usuarios</p>
                </div>
              </div>
            </div>
            <div className="featured-image">
              <div className="image">
                <img src={Coracao} alt="avatar" />
              </div>
            </div>
          </section>

          {/* ---- ABOUT ---- */}
          <section className="section" id="about">
            <div className="top-header">
              <h1>Sobre Nós</h1>
            </div>
            <div className="row">
              <div className="col">
                <div className="about-info">
                  <h3>Introdução</h3>
                  <p>
                    Nosso empreendimento é necessário em uma sociedade como a dos
                    dias de hoje, pois praticar uma ação voluntária pode te trazer
                    muitas habilidades, experiências valiosas, conhecer pessoas
                    incríveis e até gerar um impacto positivo em sua comunidade,
                    além do mais, a prática frequente dessa ação leva um senso de
                    realização e satisfação pessoal. Ongs sempre precisam de
                    pessoas para fazer o bem sem olhar a quem, acreditamos na
                    compaixão e na humildade de voluntários para ajudar e colocar
                    a mão na massa por um país melhor e uma sociedade mais
                    positiva. Portanto, nosso empreendimento é necessário para a
                    evolução pessoal de cada pessoa e para a distribuição de
                    trabalhos voluntários em todo o país.
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="about-info">
                  <h3>Propósitos</h3>
                  <p>
                    A empresa união voluntária influencia as pessoas a trabalharem
                    em ações não remuneradas, a fim de ajudar e crescer projetos e
                    ONGs. Nossa grande meta é apresentar um ótimo trabalho no
                    funcionamento do nosso site, e que a comunicação do usuário e
                    da organização seja sempre agradável e espontânea. Alcançando
                    um grande índice de acesso e voluntariados acreditamos que
                    podemos expandir e até melhorar em alguns pontos. Dentro das
                    ONGs pretendemos atingir o maior número de pessoas para
                    conseguir mais trabalhos e garantir outros resultados
                    significantes, e assim podendo fazer valer a pena a união
                    voluntária.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ---- VOLUNTEERS ---- */}
          <section className="new section" id="volun">
            <div className="top-header">
              <h1>Voluntarios</h1>
            </div>
            <div className="new__container container grid">
              <div className="row">
                <div className="col">
                  <div className="new__data">
                    <h2 className="section__title">
                      O.L.E APRESENTA <br />
                      ALGUMAS IDEIAS
                    </h2>
                    <br />
                    <p className="new__description">
                      Ao nosso espaço dedicado aos heróis do cotidiano - os
                      voluntários. Aqui, você encontrará oportunidades únicas para
                      dedicar seu tempo, talento e energia a causas que importam.
                      Explore uma variedade de trabalhos voluntários que se
                      alinham aos seus interesses e paixões, e junte-se a nós na
                      construção de um mundo mais solidário e compassivo. Seja
                      parte da mudança que você deseja ver no mundo. Comece sua
                      jornada de impacto hoje!
                    </p>
                    <br />
                    <div className="featured-text-btn">
                      <a className="sop" href="#ongs">
                        <button className="btn blue-btn">Baixar App</button>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="new__content grid">
                    <article className="new__card">
                      <img src={Empatia} alt="image" className="new__img" />
                      <h2 className="new__title">Empatia</h2>
                    </article>

                    <article className="new__card">
                      <img src={Solidariedade} alt="image" className="new__img" />
                      <h2 className="new__title">Solidariedade</h2>
                    </article>

                    <article className="new__card">
                      <img src={Cooperacao} alt="image" className="new__img" />
                      <h2 className="new__title">Cooperação</h2>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---- PROJECTS ---- */}
          <section className="new section" id="projects">
            <div className="top-header">
              <h1>Evento</h1>
            </div>

            <div className="project__container container grid">
                <div className="project_icon">
                  <i className="ri-arrow-left-s-line"></i>
                </div>

                <article className="project__card">
                  <img src="image/interclasse.png" alt="image" className="project__img" />
      
                  <h3 className="project__title">
                    EVENTOS <br />
                    BENEFICIENTE
                  </h3>
                  <span className="project__status">Em Andamnto</span>
      
                  <button className="project__button">
                    <i className="ri-stack-line"></i>
                  </button>
                </article>
      
                <article className="project__card">
                  <img src="image/evento.png" alt="image" className="project__img" />
      
                  <h3 className="project__title">
                    EVENTOS <br />
                    BENEFICIENTE
                  </h3>
                  <span className="project__status">A Começar</span>
      
                  <button className="project__button">
                    <i className="ri-stack-line"></i>
                  </button>
                </article>
      
                <article className="project__card">
                  <img src="image/carta 2.png" alt="image" className="project__img" />
      
                  <h3 className="project__title">
                    EVENTOS <br />
                    BENEFICIENTE
                  </h3>
                  <span className="project__status">A Começar</span>
      
                  <button className="project__button">
                    <i className="ri-stack-line"></i>
                  </button>
                </article>

                <article className="project__card">
                  <img src="image/parceria.png" alt="image" className="project__img" />
      
                  <h3 className="project__title">
                    EVENTOS <br />
                    BENEFICIENTE
                  </h3>
                  <span className="project__status">Em Andamento</span>
      
                  <button className="project__button">
                    <i className="ri-stack-line"></i>
                  </button>
                </article>

                <div className="project_icon">
                  <i className="ri-arrow-right-s-line"></i>
                </div>
                
              </div>

              <div className="project_list">
                <div className="list_circle active"></div>
                <div className="list_circle"></div>
                <div className="list_circle"></div>
              </div>
          </section>

          {/* ---- ONGs ---- */}
          <section className="ong section" id="ongs">
            <div className="top-header">
                <h1>ONGs</h1> {/* Correção da nomenclatura */}
            </div>
            <div className="ong__container container grid">
                <div className="row">
                <div className="col">
                    <div className="ong__data left">
                        <h2 className="section__title">
                        Ao cadastrar sua ONG em <br/>
                        nosso site, você terá <br/> 
                        acesso a diversas <br/> 
                        vantagens, incluindo
                        </h2>    
                    </div>
                </div>

                <div className="col">
                    <div className="ong__data right">
                    <h2 className="section__title">
                        Cadastre Sua ONG
                    </h2>
                    <br />
                    <p className="ong__description">
                        Ao nosso espaço dedicado aos heróis do cotidiano - os voluntários. Aqui, você encontrará oportunidades únicas para dedicar seu tempo, talento e energia a causas que importam. Explore uma variedade de trabalhos voluntários que se alinham aos seus interesses e paixões, e junte-se a nós na construção de um mundo mais solidário e compassivo. Seja parte da mudança que você deseja ver no mundo. Comece sua jornada de impacto hoje!
                    </p>
                    <br />
                    <div className="featured-text-btn on">
                        <a className="sop" href="#ongs">
                        <button className="btn blue-btn">Cadastrar-se</button>
                        </a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>


          {/* ---- INFO ---- */}
          <section className="information" id="information">
            <div className="inf__data">
              <h2 className="section__title">
                Ao cadastrar sua ONG em <br/>
                nosso site, você terá <br/> 
                acesso a diversas <br/> 
                vantagens, incluindo
              </h2>                 
            </div>

            <div className="timeline-items">

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Visibilidade Aumentada</h3>
                    <p>Alcance um público maior e conecte-se com pessoas interessadas em apoiar sua causa.</p>
                  </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Recursos Exclusivos</h3>
                    <p>Acesse materiais educativos, oportunidades de financiamento e parcerias estratégicas.</p>
                  </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Rede de Colaboração</h3>
                    <p> Interaja com outras ONGs e compartilhe experiências, desafios e soluções.</p>
                  </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Plataforma de Voluntariado</h3>
                    <p>Alcance um público maior e conecte-se com pessoas interessadas em apoiar sua causa.</p>
                  </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Captação de Doações</h3>
                    <p>Facilite a doação de recursos financeiros e materiais, essencial para a continuidade de suas atividades.</p>
                  </div>
                  
              </div>
            </div>
          </section>
        </main>

        {/* ---- FOOTER ---- */}
        <footer>
            <div className="top-footer">
                <p>União Voluntaria</p>
            </div>
            <div className="middle-footer">
                <ul className="footer-menu">
                <li className="footer_menu_list">
                    <a href="#home">Home</a>
                </li>
                <li className="footer_menu_list">
                    <a href="#about">Sobre nós</a>
                </li>
                <li className="footer_menu_list">
                    <a href="#ongs">Ongs</a>
                </li>
                <li className="footer_menu_list">
                    <a href="#volun">Voluntários</a>
                </li>
                </ul>
            </div>

            <div className="footer-social-icons">
                <div className="icon">
                <a href="#">
                    <i className="uil uil-instagram"></i>
                </a>
                </div>
            </div>

            <div className="bottom-footer">
                <p>
                Copyright &copy; 
                <a href="#home" style={{ textDecoration: "none" }}>Reinado Barbosa</a>
                </p>
            </div>
        </footer>


      </div>
    </>
  );
};

export default Principal
