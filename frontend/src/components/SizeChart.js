import React from "react";
// import { Table } from "react-bootstrap";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
} from "@chakra-ui/react";

function SizeChart({ category, rootProps }) {
  return (
    // <div>
    //   {category == "ladies" ? (
    //     <Table>
    //       <thead>
    //         <tr>
    //           <th>India</th>
    //           <th>Length (in cm)</th>
    //           <th>Eur</th>
    //           <th>Length (in inch)</th>
    //           <th>US</th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>4</td>
    //           <td>23.50</td>
    //           <td>36</td>
    //           <td>9.25</td>
    //           <td>5</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>5</td>
    //           <td>24.00</td>
    //           <td>37</td>
    //           <td>9.45</td>
    //           <td>6</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>6</td>
    //           <td>24.50</td>
    //           <td>38</td>
    //           <td>9.65</td>
    //           <td>7</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>7</td>
    //           <td>25.00</td>
    //           <td>39</td>
    //           <td>9.84</td>
    //           <td>8</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>8</td>
    //           <td>25.50</td>
    //           <td>40</td>
    //           <td>10.04</td>
    //           <td>9</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>9</td>
    //           <td>26.00</td>
    //           <td>41</td>
    //           <td>10.24</td>
    //           <td>10</td>
    //           <td></td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   ) : (
    //     <Table>
    //       <thead>
    //         <tr>
    //           <th>Age</th>
    //           <th>India</th>
    //           <th>Inch</th>
    //           <th>Eur</th>
    //           <th>US</th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr>
    //           <td>0-4 months</td>
    //           <td>1(S)</td>
    //           <td>3.75</td>
    //           <td>16</td>
    //           <td>0</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>6 months</td>
    //           <td>2(S)</td>
    //           <td>4.125</td>
    //           <td>17</td>
    //           <td>1</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>8 months</td>
    //           <td>3(S)</td>
    //           <td>4.5</td>
    //           <td>18</td>
    //           <td>2</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>10-12 months</td>
    //           <td>4(S)</td>
    //           <td>4.75</td>
    //           <td>19</td>
    //           <td>3</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>1 year</td>
    //           <td>5(S)</td>
    //           <td>5.125</td>
    //           <td>20</td>
    //           <td>4</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>1.5 years</td>
    //           <td>6(S)</td>
    //           <td>5.5</td>
    //           <td>21</td>
    //           <td>5</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>2 years</td>
    //           <td>7(S)</td>
    //           <td>5.75</td>
    //           <td>22</td>
    //           <td>6</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>2.5 years</td>
    //           <td>8(S)</td>
    //           <td>6.125</td>
    //           <td>23</td>
    //           <td>7</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>3 years</td>
    //           <td>9(S)</td>
    //           <td>6.5</td>
    //           <td>24</td>
    //           <td>8</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>3.5 years</td>
    //           <td>10(S)</td>
    //           <td>6.75</td>
    //           <td>25</td>
    //           <td>9</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>4 years</td>
    //           <td>11(S)</td>
    //           <td>7.125</td>
    //           <td>26</td>
    //           <td>10</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>5 years</td>
    //           <td>12(S)</td>
    //           <td>7.5</td>
    //           <td>27</td>
    //           <td>11</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>6 years</td>
    //           <td>1(L)</td>
    //           <td>7.91</td>
    //           <td>28</td>
    //           <td>13</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>6.5 years</td>
    //           <td>2(L)</td>
    //           <td>8.15</td>
    //           <td>29</td>
    //           <td>1</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>7 years</td>
    //           <td>3(L)</td>
    //           <td>8.43</td>
    //           <td>30</td>
    //           <td>2</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>7.5 years</td>
    //           <td>4(L)</td>
    //           <td>8.66</td>
    //           <td>31</td>
    //           <td>3</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>8 years</td>
    //           <td>5(L)</td>
    //           <td>8.94</td>
    //           <td>32</td>
    //           <td>4</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>8.5 years</td>
    //           <td>6(L)</td>
    //           <td>9.17</td>
    //           <td>33</td>
    //           <td>5</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>9-10 years</td>
    //           <td>7(L)</td>
    //           <td>9.45</td>
    //           <td>34</td>
    //           <td>6</td>
    //           <td></td>
    //         </tr>
    //         <tr>
    //           <td>11-12 years</td>
    //           <td>8(L)</td>
    //           <td>9.72</td>
    //           <td>35</td>
    //           <td>7</td>
    //           <td></td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   )}
    // </div>
    <TableContainer>
      {category == "ladies" ? (
        <Table size="lg" variant={"striped"}>
          <TableCaption>
            <Image
              height="200px"
              src="https://kamsincollection.s3.ap-south-1.amazonaws.com/step-3-14202755-720.jpg"
              {...rootProps}
            />
          </TableCaption>
          <Thead>
            <Tr>
              <Th>India</Th>
              <Th>Length (in cm)</Th>
              <Th>Eur</Th>
              <Th>Length (in inch)</Th>
              <Th>US</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric>4</Td>
              <Td isNumeric>23.50</Td>
              <Td isNumeric>36</Td>
              <Td isNumeric>9.25</Td>
              <Td isNumeric>5</Td>
            </Tr>
            <Tr>
              <Td isNumeric>5</Td>
              <Td isNumeric>24.00</Td>
              <Td isNumeric>37</Td>
              <Td isNumeric>9.45</Td>
              <Td isNumeric>6</Td>
            </Tr>
            <Tr>
              <Td isNumeric>6</Td>
              <Td isNumeric>24.50</Td>
              <Td isNumeric>38</Td>
              <Td isNumeric>9.65</Td>
              <Td isNumeric>7</Td>
            </Tr>
            <Tr>
              <Td isNumeric>7</Td>
              <Td isNumeric>25.00</Td>
              <Td isNumeric>39</Td>
              <Td isNumeric>9.84</Td>
              <Td isNumeric>8</Td>
            </Tr>
            <Tr>
              <Td isNumeric>8</Td>
              <Td isNumeric>25.50</Td>
              <Td isNumeric>40</Td>
              <Td isNumeric>10.04</Td>
              <Td isNumeric>9</Td>
            </Tr>
            <Tr>
              <Td isNumeric>9</Td>
              <Td isNumeric>26.00</Td>
              <Td isNumeric>41</Td>
              <Td isNumeric>10.24</Td>
              <Td isNumeric>10</Td>
            </Tr>
          </Tbody>
        </Table>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Age</Th>
              <Th>India</Th>
              <Th>Inch</Th>
              <Th>Eur</Th>
              <Th>US</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric>0-4 months</Td>
              <Td isNumeric>1(S)</Td>
              <Td isNumeric>3.75</Td>
              <Td isNumeric>16</Td>
              <Td isNumeric>0</Td>
            </Tr>
            <Tr>
              <Td isNumeric>6 months</Td>
              <Td isNumeric>2(S)</Td>
              <Td isNumeric>4.125</Td>
              <Td isNumeric>17</Td>
              <Td isNumeric>1</Td>
            </Tr>
            <Tr>
              <Td isNumeric>8 months</Td>
              <Td isNumeric>3(S)</Td>
              <Td isNumeric>4.5</Td>
              <Td isNumeric>18</Td>
              <Td isNumeric>2</Td>
            </Tr>
            <Tr>
              <Td isNumeric>10-12 months</Td>
              <Td isNumeric>4(S)</Td>
              <Td isNumeric>4.75</Td>
              <Td isNumeric>19</Td>
              <Td isNumeric>3</Td>
            </Tr>
            <Tr>
              <Td isNumeric>1 year</Td>
              <Td isNumeric>5(S)</Td>
              <Td isNumeric>5.125</Td>
              <Td isNumeric>20</Td>
              <Td isNumeric>4</Td>
            </Tr>
            <Tr>
              <Td isNumeric>1.5 years</Td>
              <Td isNumeric>6(S)</Td>
              <Td isNumeric>5.5</Td>
              <Td isNumeric>21</Td>
              <Td isNumeric>5</Td>
            </Tr>
            <Tr>
              <Td isNumeric>2 years</Td>
              <Td isNumeric>7(S)</Td>
              <Td isNumeric>5.75</Td>
              <Td isNumeric>22</Td>
              <Td isNumeric>6</Td>
            </Tr>
            <Tr>
              <Td isNumeric>2.5 years</Td>
              <Td isNumeric>8(S)</Td>
              <Td isNumeric>6.125</Td>
              <Td isNumeric>23</Td>
              <Td isNumeric>7</Td>
            </Tr>
            <Tr>
              <Td isNumeric>3 years</Td>
              <Td isNumeric>9(S)</Td>
              <Td isNumeric>6.5</Td>
              <Td isNumeric>24</Td>
              <Td isNumeric>8</Td>
            </Tr>
            <Tr>
              <Td isNumeric>3.5 years</Td>
              <Td isNumeric>10(S)</Td>
              <Td isNumeric>6.75</Td>
              <Td isNumeric>25</Td>
              <Td isNumeric>9</Td>
            </Tr>
            <Tr>
              <Td isNumeric>4 years</Td>
              <Td isNumeric>11(S)</Td>
              <Td isNumeric>7.125</Td>
              <Td isNumeric>26</Td>
              <Td isNumeric>10</Td>
            </Tr>
            <Tr>
              <Td isNumeric>5 years</Td>
              <Td isNumeric>12(S)</Td>
              <Td isNumeric>7.5</Td>
              <Td isNumeric>27</Td>
              <Td isNumeric>11</Td>
            </Tr>
            <Tr>
              <Td isNumeric>6 years</Td>
              <Td isNumeric>1(L)</Td>
              <Td isNumeric>7.91</Td>
              <Td isNumeric>28</Td>
              <Td isNumeric>13</Td>
            </Tr>
            <Tr>
              <Td isNumeric>6.5 years</Td>
              <Td isNumeric>2(L)</Td>
              <Td isNumeric>8.15</Td>
              <Td isNumeric>29</Td>
              <Td isNumeric>1</Td>
            </Tr>
            <Tr>
              <Td isNumeric>7 years</Td>
              <Td isNumeric>3(L)</Td>
              <Td isNumeric>8.43</Td>
              <Td isNumeric>30</Td>
              <Td isNumeric>2</Td>
            </Tr>
            <Tr>
              <Td isNumeric>7.5 years</Td>
              <Td isNumeric>4(L)</Td>
              <Td isNumeric>8.66</Td>
              <Td isNumeric>31</Td>
              <Td isNumeric>3</Td>
            </Tr>
            <Tr>
              <Td isNumeric>8 years</Td>
              <Td isNumeric>5(L)</Td>
              <Td isNumeric>8.94</Td>
              <Td isNumeric>32</Td>
              <Td isNumeric>4</Td>
            </Tr>
            <Tr>
              <Td isNumeric>8.5 years</Td>
              <Td isNumeric>6(L)</Td>
              <Td isNumeric>9.17</Td>
              <Td isNumeric>33</Td>
              <Td isNumeric>5</Td>
            </Tr>
            <Tr>
              <Td isNumeric>9-10 years</Td>
              <Td isNumeric>7(L)</Td>
              <Td isNumeric>9.45</Td>
              <Td isNumeric>34</Td>
              <Td isNumeric>6</Td>
            </Tr>
            <Tr>
              <Td isNumeric>11-12 years</Td>
              <Td isNumeric>8(L)</Td>
              <Td isNumeric>9.72</Td>
              <Td isNumeric>35</Td>
              <Td isNumeric>7</Td>
            </Tr>
          </Tbody>
        </Table>
      )}
    </TableContainer>
  );
}

export default SizeChart;
