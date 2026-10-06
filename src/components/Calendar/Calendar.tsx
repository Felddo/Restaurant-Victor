import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import iCalendarPlugin from '@fullcalendar/icalendar';

import { motion } from "motion/react";

interface MyComponentProps {
  ical?: string;
}

export const Calendar = ({ical = ''}: MyComponentProps) => {
    const link = `/proxy?url=${encodeURIComponent(ical)}`;

    return (
        <motion.div 
            className="scroll-mt-30 custom-calendar p-4 bg-white rounded-4xl shadow-xl"
            id='ical'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >   
            <h2 className="sr-only">Календарь занятости и бронирования</h2>
            <FullCalendar
                plugins={[dayGridPlugin, iCalendarPlugin]}
                initialView="dayGridMonth"
                locale="ru"
                firstDay={1}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
                }}
                events={{
                    url: link,
                    format: 'ics'
                }}

                eventDataTransform={(eventData) => {
                    if (eventData.end) {
                        const endData = new Date(String(eventData.end));
                        endData.setDate(endData.getDate() - 1);
                        return {
                            ...eventData,
                            end: endData
                        };
                    }
                    return eventData;
                }}

                eventContent={() => (
                    <div className="w-full text-xs text-center font-normal md:font-bold truncate px-1" title="Занято">
                        Занято
                    </div>
                )}
                height="auto"
                fixedWeekCount={false}
            />
            <span className='btn-text text-gray-600 italic'>Данные обновляются каждые 15–30 минут</span>
        </motion.div>
    );
};