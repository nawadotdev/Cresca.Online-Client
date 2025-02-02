export const loginService = async (username: string, password: string) => {
  try {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
      throw new Error("Kullanıcı adı veya şifre hatalı");
    } else if (response.status === 500) {
      throw new Error("Sunucu hatası oluştu");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sunucu hatası oluştu");
  }
};

export const registerService = async (username: string, password: string, passwordConfirm: string, name: string, surname: string, phone: number) => {

  if (password !== passwordConfirm) {
    throw new Error("Şifreler eşleşmiyor");
  }

  if(name === "" || surname === "" || username === "" || password === "" || passwordConfirm === "" || isNaN(phone)){
    throw new Error("Lütfen tüm alanları doldurun")
  }

  try {
    const response = await fetch("api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 400) {
      throw new Error("Kullanıcı adı zaten alınmış");
    } else if (response.status === 500) {
      throw new Error("Sunucu hatası oluştu");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Sunucu hatası oluştu");
  }
}

