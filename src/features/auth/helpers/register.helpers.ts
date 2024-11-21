import * as Yup from 'yup';

const email = Yup.string()
  .required('Email is required!')
  .email('Invalid Email!');

const nameRegex =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

const firstname = Yup.string()
  .matches(
    nameRegex,
    'First name cannot contain numbers or special characters!'
  )
  .max(20, 'First name cannot exceed 20 characters!')
  .required('First name is required!');

const lastname = Yup.string()
  .matches(nameRegex, 'Last name cannot contain numbers or special characters!')
  .max(20, 'Last name cannot exceed 20 characters!')
  .required('Last name is required!');

const mobile = Yup.string()
  .required('Mobile is required!')
  .matches(
    /^([+]\d{2})?\d{10}$/,
    'Mobile number must start with 0, be 10 digits long, and contain only numbers!'
  );

const password = Yup.string()
  .required('Password is required')
  .matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\wｧ-ﾝﾞﾟ!"#$%&'()*+,–\-./:;<=>?@[\]^_`{|}]{8,32}$/,
    'Password must contain at least 8 characters, one uppercase, one lowercase and one number'
  );

export const schema = Yup.object({
  email,
  password,
  firstname,
  lastname,
  mobile,
});

export const initFormValue = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  mobile: '',
};
