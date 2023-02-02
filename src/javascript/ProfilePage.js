import styled from "styled-components";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Menu from "./components/shared/Menu.js";
import { ContentStyle, Form, FormsLabel } from "../stylesheet/models.js";
import { getUser, putUser } from "../services/services.js";
import { changeUserSchema } from "../Schemas/changeUserSchema.js";
import BannerAddProduct from "./components/shared/BannerAddProduct.js";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    profilePictureURL: "",
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function saveChanges(event) {
    event.preventDefault();
    const validation = changeUserSchema.validate(form, { abortEarly: false });

    if (validation.error !== undefined) {
      alert(validation.error.message);
      return;
    }

    if (
      form.name === user.name &&
      user.profilePictureURL === form.profilePictureURL
    ) {
      alert("salvo com sucesso");
      return;
    }

    const body = {
      name: form.name,
      profilePictureURL: form.profilePictureURL,
    };

    setIsLoading(true);
    putUser(body, config).then(() => {
      alert("salvo com sucesso");
      setIsLoading(false);
    });
  }

  useEffect(() => {
    const promise = getUser(config);

    setIsLoading(true);
    promise.then((response) => {
      const data = response.data;
      setUser(data);
      setForm({
        name: data.name,
        profilePictureURL: data.profilePictureURL,
      });
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content>
      <Menu />
      <Wrapper>
        {isLoading || user === null ? (
          <Oval
            height="60"
            width="240"
            color="white"
            secondaryColor="#AEA972"
            visible={true}
          />
        ) : (
          <>
            <ProfilePicture picture={user.profilePictureURL} />
            <Name>{user.name}</Name>
            <Form>
              <form onSubmit={saveChanges}>
                <FormsLabel for="name">Nome:</FormsLabel>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  id="name"
                  onChange={handleForm}
                  placeholder="Nome"
                  disabled={isLoading}
                />
                <FormsLabel for="name">Foto de Perfil:</FormsLabel>
                <input
                  type="text"
                  name="profilePictureURL"
                  id="profilePictureURL"
                  value={form.profilePictureURL}
                  onChange={handleForm}
                  placeholder="URL da foto de perfil"
                  disabled={isLoading}
                />
                <button type="submit">
                  {!isLoading ? (
                    "Salvar"
                  ) : (
                    <Oval
                      height="20"
                      width="80"
                      color="white"
                      secondaryColor="#AEA972"
                      visible={true}
                    />
                  )}
                </button>
              </form>
            </Form>
            <BannerAddProduct />
          </>
        )}
      </Wrapper>
    </Content>
  );
}

export { ProfilePage };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 0px 10px;
`;
const Name = styled.span`
  font-size: 24px;
  margin-top: 5px;
  font-family: "Raleway";
  font-weight: 500;
  color: white;
`;
const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  border: 1px white solid;
  ${(props) => {
    return `background: url(${props.picture}) center center no-repeat;`;
  }}
  background-size: cover;
`;
const Content = styled(ContentStyle)``;
