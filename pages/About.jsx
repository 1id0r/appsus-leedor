export function About() {
  return (
    <div className='about'>
      <h1>About Appsus</h1>
      <p>
        <strong>Welcome to Appsus!</strong>
      </p>
      <p>
        Appsus is a dynamic single-page application that brings together a collection of useful mini apps for your daily
        needs. Designed to be functional, beautiful, and fully responsive, Appsus offers a seamless user experience by
        encapsulating multiple apps into one place. Navigate effortlessly between each mini app and enhance your
        productivity!
      </p>

      <h2>Our Mini Apps</h2>
      <ul>
        <li>
          <strong>MisterEmail</strong>: Your go-to app for managing emails efficiently and keeping track of your
          communication.
        </li>
        <li>
          <strong>MissKeep</strong>: A notes and to-do management app, designed to keep you organized.
        </li>
        <li>
          <strong>MissBooks</strong>: Access your favorite books, manage your reading list, and enjoy literature with
          ease.
        </li>
      </ul>

      <h2>Project Mission</h2>
      <p>
        Our mission was to create an all-in-one hub for essential everyday tools that provides easy access to
        productivity apps. We've focused on delivering a clean, intuitive interface that works beautifully on both
        desktop and mobile, ensuring a responsive design for any device.
      </p>

      <h2>The Team</h2>
      <p>
        Appsus was built collaboratively by a talented team of developers, each contributing to the individual apps
        while also focusing on the overall project’s success.
      </p>
      <ul>
        <li>
          <strong>Lidor Nissim</strong>: Lead Developer of LeeDor Notes and responsible for overall app integration.
        </li>
        <li>
          <strong>Lee Shavit</strong>: Lead Developer of LeeDor Mails and responsible for UI/UX and app navigation.
        </li>
      </ul>

      <h2>Technology Stack</h2>
      <p>
        Appsus is built using modern web technologies to ensure optimal performance and scalability. Our stack includes:
      </p>
      <ul>
        <li>
          <strong>JavaScript</strong> (with React)
        </li>
        <li>
          <strong>HTML5/CSS3</strong> for a responsive and visually appealing design
        </li>
        <li>
          <strong>GitHub Pages</strong> for deployment and easy access.
        </li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>
        We are continually improving Appsus, adding more features, and fine-tuning the user experience. We hope you find
        these mini apps useful and enjoy using them as much as we enjoyed creating them!
      </p>
      <div className='team'>
        <div className='team-member'>
          <img src='assets/img/leeImg.jpg' alt='Lee Shavit' className='team-photo' />
          <div className='team-info'>
            <h3>Lee Shavit</h3>
            <p>At 26, living in Tel Aviv, I’m driven by curiosity and the thrill of problem-solving. Currently immersed in full-stack development, I’m excited to turn ideas into code and craft solutions that make an impact."</p>
            <div className='social-links'>
              <a href='https://www.linkedin.com/in/leeshavit10/' target='_blank' rel='noopener noreferrer'>
                <img src='assets/img/linkedin2.svg' alt='github' />
              </a>
              <a href='https://github.com/LeeShavit' target='_blank' rel='noopener noreferrer'>
                <img src='assets/img/github.svg' alt='github' />
              </a>
            </div>
          </div>
        </div>

        <div className='team-member'>
          <img src='assets/img/myimg.jpeg' alt='Lidor Nissim' className='team-photo' />
          <div className='team-info'>
            <h3>Lidor Nissim</h3>
            <p>
              23 years old, I’m from Petah Tikva, Israel, with a strong passion for coding and a love for challenges.
              I’m currently studying web development at Coding Academy.
            </p>
            <div className='social-links'>
              <a href='https://www.linkedin.com/in/lidor-nissim-397009231/' target='_blank' rel='noopener noreferrer'>
                <img src='assets/img/linkedin2.svg' alt='Mail' />
              </a>
              <a href='https://github.com/1id0r' target='_blank' rel='noopener noreferrer'>
                <img src='assets/img/github.svg' alt='github' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
