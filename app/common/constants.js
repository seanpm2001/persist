export const ROLE_ADMIN = 'Admin';
export const ROLE_OWNER = 'Owner';
export const ROLE_COUNSELOR = 'Counselor';

export const getRole = (checkRole) => {
    let role;
    switch (checkRole) {
        case ROLE_ADMIN:
            role = 3;
            break;
        case ROLE_OWNER:
            role = 2;
            break;
        case ROLE_COUNSELOR:
            role = 1;
            break;
        default:
            role = 0;
    }
    return role;
};

export const mapping = {
    ethnicity: {
        1: 'American Indian or Alaskan Native',
        2: 'Asian or Pacific Islander',
        3: 'Hispanic',
        4: 'Black',
        5: 'White',
        6: 'Unknown',
        7: 'Multiracial'
    },
    colType: {
        1: 'CUNY',
        2: 'SUNY',
        3: 'Public, Not NY',
        4: 'Private, not for Profit',
        5: 'Private, for profit',
        6: 'Vocational/Technical'
    }
};
