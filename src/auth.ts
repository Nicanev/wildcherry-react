export function RequireAuth(): boolean {
  const token = localStorage.getItem("token");

  if (token) {
    return true;
  } else {
    return false;
  }
}

// Пример использования
if (RequireAuth()) {
  // показываем защищенную страницу
} else {
  // перенаправляем на страницу авторизации
}


