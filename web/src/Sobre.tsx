import { Link } from 'react-router-dom';
import imagemDoce from './assets/doce.png';

export default function Sobre() {
  return (
    <section className="about-section">
      <div className="section-header">
        <p className="section-subtitle">Sobre Nós</p>
        <h2 className="section-title">Bem-vindo à Doce Vida</h2>
      </div>

      <div className="about-grid">
        <div className="about-img-container">
          <img src={imagemDoce} alt="Sobremesas da Doce Vida" />
        </div>

        <div className="about-text-content">
          <h3 className="about-heading">
            Alta qualidade e carinho em cada detalhe do seu pedido
          </h3>
          <p className="about-paragraph">
            Uma doceria artesanal que conecta você aos melhores sabores, oferecendo bolos, doces finos e sobremesas feitas com alta qualidade de forma prática e rápida.
          </p>
          <p className="about-paragraph">
            Contamos com entregas agendadas, atendimento personalizado e cardápio diário para deixar seu dia mais doce.
          </p>

          <div className="about-highlights">
            <div className="highlight-box">
              <h4>100% Saudável</h4>
              <p>Ingredientes selecionados e de alta procedência.</p>
            </div>
            <div className="highlight-box">
              <h4>Premiados</h4>
              <p>Reconhecidos pelo sabor e atendimento exclusivo.</p>
            </div>
          </div>

          <div style={{ marginTop: '35px' }}>
            <Link to="/" className="hero-btn">
              &larr; Voltar para a Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}