import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name && number) {
      dispatch(addContact({ name, number }));
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label className={styles.label}>
        Name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className={styles.input}
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          type="text"
          value={number}
          onChange={e => setNumber(e.target.value)}
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.button}>Add Contact</button>
    </form>
  );
};

export default ContactForm;