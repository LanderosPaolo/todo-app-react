import { useState } from "react";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  const totalTareas = tareas.length

  const tareasCompletadas = tareas.filter(tarea => tarea.completada).length

  const tareasPendientes = totalTareas - tareasCompletadas;

  const escucharInput = (e) => {
    setTexto(e.target.value);
  };

  const agregarTarea = () => {
    if (texto.trim()) {
      console.log("Agregando tarea...");

      const nuevaTarea = {
        id: Date.now(),
        texto: texto.trim(),
        completada: false,
      };

      setTareas([...tareas, nuevaTarea]);

      console.log("Tarea agregada")

      setTexto("");
    } else {
      console.log("Debes escribir una tarea valida");
    }
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter(tarea => tarea.id !== id)
    setTareas(nuevasTareas)
  }

  const cambiarEstado = (id) => {
    setTareas(tareas.map(tarea => {
      if (tarea.id === id) {
        return {...tarea, completada: !tarea.completada}
      }
      return tarea
    }))
  }

  return (
    <>
      <h1>TodoApp</h1>
      <input
        type="text"
        value={texto}
        onChange={escucharInput}
        placeholder="Escribe tu tarea"
      />
      <button onClick={agregarTarea}>Agregar</button>
      {tareas.map((t) => (
        <div key={t.id} style={{textDecoration: t.completada? 'line-through' : 'none'}}>
          <input type="checkbox" id={t.id} name={t.texto} checked={t.completada} onChange={() => cambiarEstado(t.id)}/>
          <label htmlFor={t.id}>{t.texto}</label>
          <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
        </div>
      ))}

        <div>
          <p>Total: {totalTareas}</p>
          <p>Completadas: {tareasCompletadas}</p>
          <p>Pendientes: {tareasPendientes}</p>
        </div>

    </>
  );
}

export default App;
