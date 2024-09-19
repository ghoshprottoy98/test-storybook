import type { Meta, StoryObj } from '@storybook/angular';
import { EasygridComponent } from './easygrid.component';
import { moduleMetadata } from '@storybook/angular';
import { EasyGridModule } from '../shared/easy-grid/src/public-api';

const meta: Meta<EasygridComponent> = {
  title: 'Components/Easygrid',
  component: EasygridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [EasyGridModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<EasygridComponent>;

export const Basic: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter' },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with a predefined set of static data and column definitions.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Action: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter' },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' },
      {
        colId: '__action',
        type: 'actionColumn',
        cellRendererParams: {
          actions: [
            {
              title: 'Remove',
              icon: 'fa-trash',
              iconOnly: false,
              class: 'danger'
            },
            {
              id: 'download_bulk',
              title: 'Download XLSX',
              icon: 'fa-download',
              iconOnly: true,
              bulk: {
                mode: 'filter',
                url: false
              }
            }
          ]
        },
        width: 150
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with an action column that includes actions like Remove and Download buttons.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Pagination: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter' },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Assignment', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'English Essay', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Biology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Chemistry Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Computer Science Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Art Assignment', assessmentType: 'Assignment', isActive: true },
      { assessmentName: 'Music Test', assessmentType: 'Test', isActive: false },
      { assessmentName: 'Drama Rehearsal', assessmentType: 'Performance', isActive: true },
      { assessmentName: 'Economics Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Philosophy Essay', assessmentType: 'Essay', isActive: true },
      { assessmentName: 'Sociology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Geography Test', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Psychology Assignment', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Statistics Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Engineering Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Astronomy Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Environmental Science Test', assessmentType: 'Test', isActive: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      [pagination]="true" 
      autoSizeColumnsToFit="size">
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with pagination enabled. Users can change the number of items displayed per page and change the page number to view data on different pages.',
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            [pagination]="true" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Filter: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter' },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with filter options enabled. Users can filter data using different options to view specific subsets of data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnReordering: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter' },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer' },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column reordering enabled. Users can dynamically rearrange the order of columns by dragging and dropping headers to customize their view of the data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnResizing: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter', width: 200 },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter', width: 200 },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer', width: 150 },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column resizing enabled. Users can adjust the width of columns by dragging the edges of the column headers to fit their data or personal preferences.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnSorting: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter', sortable: true },
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter', sortable: true },
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer', sortable: true },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column sorting enabled. Users can click on column headers to sort the data in ascending or descending order based on the selected column.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
