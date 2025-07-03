import {render, screen} from '@testing-library/react';
import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import SecurityForm from '.';
import { FormProvider } from 'react-hook-form';
import { register } from 'module';

describe('SecurityForm Test Suites', () => {
    const useFormMock = vi.fn().mockReturnValue({
            register: vi.fn(),
            handleSubmit: vi.fn(),
            formState: { errors: {} },
        });
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it('should render SecurityForm', () => {
        const { register } = useFormMock();
        render(<form onSubmit={vi.fn()}><SecurityForm formId='1' register={register}/></form>);
        expect(register).toHaveBeenCalledWith('1-account');
    });
    it('should render SecurityForm for Cancel PageType', () => {
        const { register } = useFormMock();
        render(<form onSubmit={vi.fn()}><SecurityForm formId='1' register={register} pageType='Cancel'/></form>);
        expect(register).toHaveBeenCalledWith('1-account');
    });
});