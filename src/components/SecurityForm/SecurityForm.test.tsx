import {render} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi} from 'vitest';
import SecurityForm from '.';


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