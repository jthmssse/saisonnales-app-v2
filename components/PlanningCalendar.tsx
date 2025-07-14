
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PlanningRoom, Resident, CalendarView } from '../types';

interface PlanningCalendarProps {
  planningData: PlanningRoom[];
  residents: Resident[];
  onSelectResident: (residentId: number) => void;
}

// --- Date Helper Functions ---
const monthNamesShort = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

const getStartOfWeek = (date: Date): Date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
};

const dateDiffInDays = (a: Date, b: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

const dayNames = ["L", "M", "M", "J", "V", "S", "D"];


const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planningData, residents, onSelectResident }) => {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // Start on July 2025

  const handlePrev = () => {
      setCurrentDate(prev => {
          const newDate = new Date(prev);
          switch (view) {
              case 'year':
                  newDate.setFullYear(newDate.getFullYear() - 1);
                  break;
              case 'month':
                  newDate.setMonth(newDate.getMonth() - 1);
                  break;
              case 'week':
                  newDate.setDate(newDate.getDate() - 7);
                  break;
          }
          return newDate;
      });
  };
  
  const handleNext = () => {
      setCurrentDate(prev => {
          const newDate = new Date(prev);
          switch (view) {
              case 'year':
                  newDate.setFullYear(newDate.getFullYear() + 1);
                  break;
              case 'month':
                  newDate.setMonth(newDate.getMonth() + 1);
                  break;
              case 'week':
                  newDate.setDate(newDate.getDate() + 7);
                  break;
          }
          return newDate;
      });
  };

  const { title, daysArray } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(currentDate);

    let newTitle = '';
    let newDaysArray: Date[] = [];

    switch (view) {
        case 'year': {
            newTitle = year.toString();
            const firstDay = new Date(year, 0, 1);
            const lastDay = new Date(year, 11, 31);
            newDaysArray = [];
            for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
                newDaysArray.push(new Date(d));
            }
            break;
        }
        case 'month': {
            newTitle = `${monthName} ${year}`;
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            newDaysArray = [];
            for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
                newDaysArray.push(new Date(d));
            }
            break;
        }
        case 'week': {
            const startOfWeek = getStartOfWeek(currentDate);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);
            const startMonthName = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(startOfWeek);
            const endMonthName = new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(endOfWeek);
            
            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                newTitle = `${startOfWeek.getDate()} - ${endOfWeek.getDate()} ${startMonthName} ${year}`;
            } else {
                newTitle = `${startOfWeek.getDate()} ${startMonthName} - ${endOfWeek.getDate()} ${endMonthName} ${year}`;
            }

            newDaysArray = [];
            for (let i = 0; i < 7; i++) {
                const day = new Date(startOfWeek);
                day.setDate(day.getDate() + i);
                newDaysArray.push(day);
            }
            break;
        }
    }
    return { title: newTitle, daysArray: newDaysArray };
}, [currentDate, view]);

  const numDays = daysArray.length;
  const today = new Date();
  today.setHours(0,0,0,0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3 sm:gap-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Planning des Séjours</h2>
        <div className="flex flex-wrap items-center space-x-2 sm:space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 sm:p-1 text-xs sm:text-sm font-medium">
                 <button onClick={() => setView('week')} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md ${view === 'week' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Semaine</button>
                 <button onClick={() => setView('month')} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md ${view === 'month' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Mois</button>
                 <button onClick={() => setView('year')} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-md ${view === 'year' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Année</button>
            </div>
            <button onClick={handlePrev} className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <span className="text-xs sm:text-sm font-medium w-32 sm:w-48 text-center capitalize">
              {title}
            </span>
            <button onClick={handleNext} className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="grid sticky top-0 z-30 bg-gray-50" style={{ gridTemplateColumns: `minmax(120px, 1.5fr) repeat(${numDays}, minmax(30px, 1fr))` }}>
            <div className="p-2 text-xs sm:text-sm font-medium text-gray-600 border-b border-t border-l border-r border-gray-200">Chambre</div>
            {daysArray.map((date) => (
              <div key={date.toISOString()} className="text-center p-1 border-b border-t border-r border-gray-200">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto flex items-center justify-center rounded-full text-xs font-semibold ${date.getTime() === today.getTime() ? 'bg-yellow-400 text-black' : ''}`}>
                      {date.getDate()}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                      {dayNames[(date.getDay() + 6) % 7]}
                  </div>
              </div>
            ))}
        </div>
        
        {/* Body */}
        <div>
          {planningData.map((room) => (
            <div key={room.roomName} className="grid h-12 sm:h-14" style={{ gridTemplateColumns: `minmax(120px, 1.5fr) repeat(${numDays}, minmax(30px, 1fr))`}}>
              <div className="flex items-center p-2 border-l border-b border-r border-gray-200 bg-white">
                  <span className="text-xs sm:text-sm font-medium text-gray-800">{room.roomName}</span>
              </div>
              {/* This container now spans all day columns and is relative for positioning stays */}
              <div className="relative border-b border-r border-gray-200 bg-white" style={{gridColumn: `span ${numDays} / span ${numDays}`}}>
                 {/* Background grid lines */}
                 <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${numDays}, 1fr)`}}>
                    {Array.from({length: numDays}).map((_, i) => (
                        <div key={i} className="border-r border-gray-100 h-full"></div>
                    ))}
                </div>

                {room.stays.map(stay => {
                    const viewStart = daysArray[0];
                    const viewEnd = new Date(daysArray[daysArray.length - 1]);
                    viewEnd.setHours(23, 59, 59, 999);

                    const stayStart = new Date(stay.start);
                    stayStart.setHours(0, 0, 0, 0);
                    const stayEnd = new Date(stay.end);
                    stayEnd.setHours(0, 0, 0, 0);

                    if (stayEnd < viewStart || stayStart > viewEnd) return null;

                    const resident = residents.find(r => r.id === stay.residentId);
                    if (!resident) return null;

                    const effectiveStart = stayStart < viewStart ? viewStart : stayStart;
                    const effectiveEnd = stayEnd > viewEnd ? viewEnd : stayEnd;
                    
                    const duration = dateDiffInDays(effectiveStart, effectiveEnd) + 1;
                    if (duration <= 0) return null;
                    
                    const offset = dateDiffInDays(viewStart, effectiveStart);
                    
                    const leftPercent = (offset / numDays) * 100;
                    const widthPercent = (duration / numDays) * 100;

                    return (
                      <div
                        key={stay.id}
                        className="absolute z-10 flex items-center bg-[#006561] rounded text-white cursor-pointer hover:bg-[#00524e] transition-colors shadow-sm h-8 sm:h-10 top-1/2 -translate-y-1/2"
                        style={{
                          left: `${leftPercent}%`,
                          width: `calc(${widthPercent}% - 2px)`,
                          minWidth: '1px',
                        }}
                        onClick={() => onSelectResident(resident.id)}
                      >
                        <span className="text-xs font-medium truncate px-1 sm:px-2">{resident.name}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningCalendar;
