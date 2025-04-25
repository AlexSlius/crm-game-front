export const switchColorRowByStatus = (status: number): string => {
    switch (status) {
        case 5:
            return 'inactive-row';
        case 6:
            return 'reserved-row';

        default:
            return ''
    }
}