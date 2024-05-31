import { useState } from "react";
import { createRoot } from 'react-dom/client';
import { CalendarRange, CalendarMonth } from "./components/CallyCalendar";
import "./components/calendar.css";

function DatePicker({ onSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event) => {
    console.log("Evento de cambio:", event);
    const { value } = event.target;
    const [startStr, endStr] = value.split('/');
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    setStartDate(startDate);
    setEndDate(endDate);
    onSelect(startDate, endDate);
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);
    onSelect(null, null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('es-ES');
  };

  const checkIfDateDisallowed = (date) => {
    // Lógica para determinar si la fecha es permitida o no
    // Por ejemplo:
    // return date.getDay() === 0 || date.getDay() === 6; // Permitir solo sábados y domingos
    return false; // Permitir todas las fechas
  };

  return (
    <div className="DatePicker">
      <CalendarRange 
        onChange={handleChange} 
        showOutsideDays={true} 
        firstDayOfWeek={1}
        isDateDisallowed={checkIfDateDisallowed}
      >
        <CalendarMonth />
      </CalendarRange>
      <div>
        <h2>Fecha Inicial: {formatDate(startDate)}</h2>
        <h2>Fecha Final: {formatDate(endDate)}</h2>
      </div>
      <button onClick={clearDates}>Limpiar Fechas</button>
    </div>
  );
}

function App() {
  const handleDateSelect = (startDate, endDate) => {
    console.log("Fecha Inicial seleccionada:", startDate);
    console.log("Fecha Final seleccionada:", endDate);
  };

  return (
    <div className="App">
      <h1>Seleccionador de Fechas</h1>
      <DatePicker onSelect={handleDateSelect} />
    </div>
  );
}

export default App;