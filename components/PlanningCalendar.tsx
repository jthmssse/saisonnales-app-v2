
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PlanningRoom, Resident, CalendarView } from '../types';

interface PlanningCalendarProps {
  planningData: PlanningRoom[];
  residents: Resident[];
  onSelectResident: (residentId: number) => void;
}

// --- Date Helper Functions ---
const dayNames = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];
const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

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


const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planningData, residents, onSelectResident }) => {
  const [view, setView] = useState<CalendarView>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // Start on July 2025

  const handlePrev = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setDate(newDate.getDate() - 7);
      }
      return newDate;
    });
  };
  
  const handleNext = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setDate(newDate.getDate() + 7);
      }
      return newDate;
    });
  };

  const { daysArray, title } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (view === 'month') {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      return {
        daysArray: Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
        title: `${monthNames[month]} ${year}`
      };
    } else { // week view
      const startOfWeek = getStartOfWeek(currentDate);
      const days = Array.from({ length: 7 }, (_, i) => {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          return day;
      });
      const endOfWeek = days[6];
      let titleStr = `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]}`;
      if (startOfWeek.getFullYear() !== endOfWeek.getFullYear()) {
        titleStr += ` ${startOfWeek.getFullYear()}`;
      }
      titleStr += ` - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getFullYear()}`
      return {
        daysArray: days,
        title: titleStr
      }
    }
  }, [currentDate, view]);

  const numDays = daysArray.length;
  const today = new Date();
  today.setHours(0,0,0,0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Planning des Séjours</h2>
        <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1 text-sm font-medium">
                 <button onClick={() => setView('week')} className={`px-3 py-1 rounded-md ${view === 'week' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Semaine</button>
                 <button onClick={() => setView('month')} className={`px-3 py-1 rounded-md ${view === 'month' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Mois</button>
                 <button disabled className="px-3 py-1 rounded-md text-gray-400 cursor-not-allowed">Année</button>
            </div>
            <button onClick={handlePrev} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium w-48 text-center capitalize">
              {title}
            </span>
            <button onClick={handleNext} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="grid sticky top-0 z-30 bg-gray-50" style={{ gridTemplateColumns: `minmax(150px, 1.5fr) repeat(${numDays}, minmax(40px, 1fr))` }}>
            <div className="p-2 text-sm font-medium text-gray-600 border-b border-t border-l border-r border-gray-200">Chambre</div>
            {daysArray.map((date) => (
              <div key={date.toISOString()} className="text-center p-1 border-b border-t border-r border-gray-200">
                  <div className={`w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs font-semibold ${date.getTime() === today.getTime() ? 'bg-yellow-400 text-black' : ''}`}>
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
            <div key={room.roomName} className="grid h-14" style={{ gridTemplateColumns: `minmax(150px, 1.5fr) repeat(${numDays}, minmax(40px, 1fr))`}}>
              <div className="flex items-center p-2 border-l border-b border-r border-gray-200 bg-white">
                  <span className="text-sm font-medium text-gray-800">{room.roomName}</span>
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

                    if (stayEnd <= viewStart || stayStart >= viewEnd) return null;

                    const resident = residents.find(r => r.id === stay.residentId);
                    if (!resident) return null;

                    const effectiveStart = stayStart < viewStart ? viewStart : stayStart;
                    const effectiveEnd = stayEnd > viewEnd ? viewEnd : stayEnd;
                    
                    const duration = dateDiffInDays(effectiveStart, effectiveEnd);
                    if (duration <= 0) return null;
                    
                    const offset = dateDiffInDays(viewStart, effectiveStart);
                    
                    const leftPercent = (offset / numDays) * 100;
                    const widthPercent = (duration / numDays) * 100;

                    return (
                      <div
                        key={stay.id}
                        className="absolute z-10 flex items-center bg-[#006561] rounded text-white cursor-pointer hover:bg-[#00524e] transition-colors shadow-sm h-10 top-1/2 -translate-y-1/2"
                        style={{
                          left: `${leftPercent}%`,
                          width: `calc(${widthPercent}% - 2px)`,
                          minWidth: '1px',
                        }}
                        onClick={() => onSelectResident(resident.id)}
                      >
                        <span className="text-xs font-medium truncate px-2">{resident.name}</span>
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
