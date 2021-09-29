import { useFormik } from "formik";
import * as Yup from "yup";

import "./App.css";
// +REGEX
// const validate = (values) => {
//   const errors = {};

//   if (!values.firstName.length) {
//     errors.firstName = "Imię jest wymagane!";
//   } else if (values.firstName.length <= 3) {
//     errors.firstName = "Za krótkie imię. Podaj minimum 4 znaki";
//   } else if (values.firstName.length > 10) {
//     errors.firstName = "Twoje imię jest zbt długie. Podaj max 10 znaków";
//   }

//   if (!values.email.length) {
//     errors.email = "email jest wymagany!";
//   }

//   return errors;
// };

const validationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .required("Imię jest wymagne")
      .min(4, "za krótkie imię, podaj minimum 4 znaki")
      .max(10, "Twoje imię jest zbt długie. Podaj max 10 znaków"),
    lastName: Yup.string()
      .required("Nazwisko jest wymagne")
      .min(4, "za krótkie nazwisko, podaj minimum 4 znaki")
      .max(10, "Twoje nazwisko jest zbt długie. Podaj max 10 znaków"),
    email: Yup.string()
      .required("email jest wymagany!")
      .email("niepoprawny adres email"), //ma już regex!
    age: Yup.number()
      .required("Podaj swój wiek")
      .min(18, "Musisz być pełnoletni")
      .max(60, "Osoby od 60 roku zycia nie mogą uczestniczyć"),
  });

function App() {
  const formik = useFormik({
    initialValues: {
      age: "",
      email: "",
      firstName: "",
      lastName: "",
    },
    validationSchema,
    // validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const errorsElements = Object.entries(formik.errors).map(([key, value]) => (
    <p key={key}>{value}</p>
  ));

  // const firstNameError = formik.errors.firstName ? (
  //   <p>{formik.errors.firstName}</p>
  // ) : null;

  // const lastNameError = formik.errors.lastName ? (
  //   <p>{formik.errors.lastName}</p>
  // ) : null;

  // const emailError = formik.errors.email ? <p>{formik.errors.email}</p> : null;

  // const ageError = formik.errors.age ? <p>{formik.errors.age}</p> : null;

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <label>
          Imię:
          <input
            className={formik.errors.firstName ? "has-error" : ""}
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            value={formik.values.firstName}
          />
        </label>
        <label>
          Nazwisko:
          <input
            className={formik.errors.lastName ? "has-error" : ""}
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            value={formik.values.lastName}
          />
        </label>
        <label>
          Email:
          <input
            className={formik.errors.email ? "has-error" : ""}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            value={formik.values.email}
          />
        </label>
        <label>
          Wiek:
          <input
            className={formik.errors.age ? "has-error" : ""}
            name="age"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            value={formik.values.age}
          />
        </label>
        <button type="submit">Wyślij</button>
      </form>
      {/* {firstNameError}
      {lastNameError}
      {emailError}
      {ageError} */}

      {errorsElements}
    </div>
  );
}

export default App;
