import { Button, DatePicker, Flex, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const START_HOUR = 10;
const END_HOUR = 22;
const SLOT_STEP = 30;

// 10:00, 10:30 ... 22:30
const SLOTS = Array.from({ length: (END_HOUR - START_HOUR + 1) * (60 / SLOT_STEP) }, (_, i) => {
    const minutes = START_HOUR * 60 + i * SLOT_STEP;

    return { hour: Math.floor(minutes / 60), minute: minutes % 60 };
});

const pad = (n: number) => `${n}`.padStart(2, '0');

export const TimeSlotPicker = ({
    value,
    onChange = () => { },
}: {
    value?: Dayjs | string | null;
    onChange?: (value: Dayjs | null) => void;
}) => {
    const current = value ? dayjs(value) : null;
    const isSlot = !!current && SLOTS.some((s) => s.hour === current.hour() && s.minute === current.minute());

    const selectSlot = (hour: number, minute: number) => {
        onChange((current || dayjs()).hour(hour).minute(minute).second(0).millisecond(0));
    };

    return (
        <Flex vertical gap={10}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(68px, 1fr))',
                    gap: 6,
                }}
            >
                {SLOTS.map(({ hour, minute }) => {
                    const active = !!current && current.hour() === hour && current.minute() === minute;

                    return (
                        <Button
                            key={`${hour}:${minute}`}
                            type={active ? 'primary' : 'default'}
                            onClick={() => selectSlot(hour, minute)}
                        >
                            {pad(hour)}:{pad(minute)}
                        </Button>
                    );
                })}
            </div>

            <Flex align="center" gap={10}>
                <Typography.Text type="secondary">Інший час:</Typography.Text>
                <DatePicker
                    picker="time"
                    format="HH:mm"
                    minuteStep={5}
                    needConfirm={false}
                    disabledTime={() => ({
                        disabledHours: () => Array.from({ length: 24 }, (_, i) => i).filter((h) => h < START_HOUR || h > END_HOUR),
                    })}
                    hideDisabledOptions
                    placeholder="--:--"
                    value={current && !isSlot ? current : null}
                    onChange={(time) => time && selectSlot(time.hour(), time.minute())}
                    allowClear={false}
                    style={{ width: 120 }}
                />
            </Flex>
        </Flex>
    );
};
