import { Pagination as BasePagination, PaginationProps } from 'antd';
import styled from 'styled-components';

const PaginationStyled = styled(BasePagination)`
  margin-bottom: 10px;
  .ant-pagination {
    &-item {
      --height: 34px;
      font-weight: 400;
      font-size: 1.2rem;
      line-height: calc(16 / 12);
      width: var(--height);
      height: var(--height);
      color: ${({ theme }) => theme.primary};
      border-color: ${({ theme }) => theme.textDisable};
      border-radius: 5px;

      a {
        color: ${({ theme }) => theme.primary};
        line-height: calc(var(--height) - 2px);
      }

      &-active {
        background-color: ${({ theme }) => theme.primary};
        border-color: ${({ theme }) => theme.primary};
        transition: all 0.2s linear;

        a {
          color: white;
        }

        &:hover {
          border-color: ${({ theme }) => theme.primary};

          opacity: 0.8;
          a {
            color: white;
          }
        }
      }
    }
  }
`;

const Pagination = ({ ...props }: PaginationProps) => {
  return <PaginationStyled {...props} />;
};

export default Pagination;
