import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>
          © {new Date().getFullYear()} NoteHub. All rights
          reserved.
        </p>

        <div className={css.wrap}>
          <p>Developer: Evgenii Ivashchenko</p>

          <p>
            Contact us:{' '}
            <a href="mailto:ivashkaevgeshka@gmail.com">
              ivashkaevgeshka@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;