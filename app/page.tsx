'use client';
import SimpleMap from '@/components/map';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import Select from 'react-select';
export default function Home() {
  const { setValue, watch, register, handleSubmit, ...form } = useForm();
  const [allChurchs, setAllChurchs] = useState([]);
  const [churchs, setChurchs] = useState([]);
  const selectedDepartment = watch('departamento');
  const selectedProvince = watch('provincia');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/churchs`)
      .then((res) => res.json())
      .then((res) => {
        setAllChurchs(res);
      });
  }, []);

  const { data: departments, isLoading: isLoadingDepartments } = useQuery<[]>(
    'departments',
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments`).then((res) =>
        res.json()
      )
  );

  const {
    data: provinces,
    isLoading: isLoadingProvinces,
    refetch: refetchProvinces,
  } = useQuery<[]>(
    ['provinces', selectedDepartment],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/provinces?department=${selectedDepartment?.value}`
      ).then((res) => res.json()),
    { enabled: false } // This query will not run automatically
  );

  const {
    data: districts,
    isLoading: isLoadingDistricts,
    refetch: refetchDistricts,
  } = useQuery<[]>(
    ['districts', selectedDepartment, selectedProvince],
    () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/districts?department=${selectedDepartment?.value}&province=${selectedProvince?.value}`
      ).then((res) => res.json()),
    { enabled: false } // This query will not run automatically
  );

  useEffect(() => {
    console.log('selectedDepartment', selectedDepartment);
    if (selectedDepartment) {
      setProvinceAndDistrict();

      refetchProvinces();
    }
  }, [selectedDepartment, refetchProvinces]);

  const setProvinceAndDistrict = () => {
    setValue('provincia', '');
    setValue('distrito', '');
  };

  useEffect(() => {
    console.log('selectedProvince', selectedProvince);
    if (selectedProvince) {
      setValue('distrito', '');
      refetchDistricts();
    }
  }, [selectedProvince, refetchDistricts]);

  const searchChurches = handleSubmit((data) => {
    console.log(data);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/churchsDist?departamento=${data.departamento.value}&provincia=${data.provincia.value}&distrito=${data.distrito.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        setChurchs(res);
      });
  });

  return (
    <main className="flex flex-col text-center p-12 bg-gray">
      <div className="flex justify-center items-center mb-4">
        <Image
          src="/images/pin.svg"
          width={32}
          height={32}
          alt="Logo de la iglesia"
        />
      </div>
      <p className="text-primary text-sm uppercase mb-4">
        Buscador de iglesias
      </p>
      <h1 className="text-primary text-5xl font-extrabold mb-4 text-center leading-[64px]">
        CONOCE TODAS LAS
      </h1>
      <h1 className="text-primary text-5xl font-extrabold mb-4 text-center">
        IGLESIAS
      </h1>
      <form className="sm:flex items-end mt-8 gap-2" onSubmit={searchChurches}>
        <div className="flex flex-col">
          <p className="text-primary text-left font-medium text-lg">
            Departamento
          </p>
          <Select
            id="departamento"
            options={departments?.map((department: any) => ({
              value: department.department,
              label: department.department,
            }))}
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: '280px',
                borderRadius: '0.5rem',
                border: 'none'
              }),
              option: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
                textAlign: 'left',
                lineHeight: '1.25rem',
                color: state.isSelected ? '#1F2937' : '#6B7280',
                backgroundColor: state.isSelected ? '#F3F4F6' : 'white',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }),
              input: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
              }),
              indicatorSeparator: (provided: any, state: any) => ({
                ...provided,
                display: 'none',
              }),
              placeholder: (provided: any, state: any) => ({
                ...provided,
                fontSize: '0.95rem',
                fontWeight: 'light',
              }),
            }}
            placeholder="Selecciona el departamento"
            noOptionsMessage={() => 'No hay departamentos'}
            {...register('departamento')}
            onChange={(value) => {
              setValue('departamento', value);
              setValue('provincia', '');
              setValue('distrito', '');
            }}
            value={watch('departamento')}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primary text-left font-medium text-lg">
            Provincia
          </p>
          <Select
            id="provincia"
            options={provinces?.map((province: any) => ({
              value: province.province,
              label: province.province,
            }))}
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: '280px',
                borderRadius: '0.5rem',
                border: 'none'
              }),
              option: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
                textAlign: 'left',
                lineHeight: '1.25rem',
                color: state.isSelected ? '#1F2937' : '#6B7280',
                backgroundColor: state.isSelected ? '#F3F4F6' : 'white',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }),
              input: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
              }),
              indicatorSeparator: (provided: any, state: any) => ({
                ...provided,
                display: 'none',
              }),
              placeholder: (provided: any, state: any) => ({
                ...provided,
                fontSize: '0.95rem',
                fontWeight: 'light',
              }),
            }}
            placeholder="Selecciona la provincia"
            noOptionsMessage={() => 'No hay provincias'}
            {...register('provincia')}
            onChange={(value) => {
              setValue('provincia', value);
              setValue('distrito', '');
            }}
            value={watch('provincia')}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primary text-left font-medium text-lg">Distrito</p>
          <Select
            id="distrito"
            options={districts?.map((district: any) => ({
              value: district.district,
              label: district.district,
            }))}
            styles={{
              control: (provided, state) => ({
                ...provided,
                width: '280px',
                borderRadius: '0.5rem',
                border: 'none'
              }),
              option: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
                textAlign: 'left',
                lineHeight: '1.25rem',
                color: state.isSelected ? '#1F2937' : '#6B7280',
                backgroundColor: state.isSelected ? '#F3F4F6' : 'white',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#F3F4F6',
                },
              }),
              input: (provided: any, state: any) => ({
                ...provided,
                fontSize: '1rem',
              }),
              indicatorSeparator: (provided: any, state: any) => ({
                ...provided,
                display: 'none',
              }),
              placeholder: (provided: any, state: any) => ({
                ...provided,
                fontSize: '0.95rem',
                fontWeight: 'light',
              }),
            }}
            placeholder="Selecciona el distrito"
            noOptionsMessage={() => 'No hay distritos'}
            {...register('distrito')}
            onChange={(value) => {
              setValue('distrito', value);
            }}
            value={watch('distrito')}
          />
        </div>
        <button className="bg-secondary  px-4 py-2 rounded-md sm:w-40 w-full mt-4 sm:mt-0">
          <p className="text-primary">Buscar</p>
        </button>
      </form>
      <div className="sm:flex mt-4 gap-2">
        <div className="flex flex-col sm:w-1/2 sm:h-[500px] mb-4 sm:mb-0 gap-2 overflow-scroll">
          {churchs.length > 0 ? (
            churchs.map((church: any, index: number) => (
              <div className="bg-white px-8 py-4" key={index}>
                <p className="text-secondary text-left text-sm">IGLESIA</p>
                <h1 className="text-primary text-left text-2xl font-bold mb-2 uppercase">
                  {church.nombreIglesia}
                </h1>
                <div className="font-light text-primary text-left mb-2">
                  {church.direccionIglesia}
                </div>
                <div className="flex gap-2 my-2">
                  <Image
                    src="/images/wapp_black.svg"
                    width={24}
                    height={24}
                    alt="Whatsapp"
                  />
                  <p className="text-primary">{church.telefonoIglesia}</p>
                </div>
                <div className="flex gap-2 justify-end">
                  {church.linkFacebook && (
                    <a href={church.linkFacebook} target="_blank">
                      <Image
                        src="/images/facebook.svg"
                        width={24}
                        height={24}
                        alt="Facebook"
                      />
                    </a>
                  )}

                  {church.linkInstagram && (
                    <a href={church.linkInstagram} target="_blank">
                      <Image
                        src="/images/instagram.svg"
                        width={24}
                        height={24}
                        alt="Instagram"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white text-black px-20 h-[500px] rounded-md flex items-center">
              <p>
                Aquí se mostrarán los resultados de la búsqueda de iglesias o no
                se encontraron iglesias en la zona seleccionada.
              </p>
            </div>
          )}
        </div>
        <div className="sm:w-2/3">
          <SimpleMap
            markers={allChurchs.map((church: any) => ({
              lat: church.latitud,
              lng: church.longitud,
              name: church.nombreIglesia,
            }))}
          />
        </div>
      </div>
    </main>
  );
}
